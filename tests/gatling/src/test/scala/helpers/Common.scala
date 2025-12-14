package helpers

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._

/**
 * Common configuration and utilities for Gatling simulations
 */
object Common {
  
  // Base URL configuration
  val baseUrl = "http://localhost:5000"
  val apiUrl = s"$baseUrl/api"
  
  // Test data - Cities
  val cities = List(
    "London", "New York", "Paris", "Tokyo", "Dubai",
    "Sydney", "Toronto", "Berlin", "Moscow", "Mumbai",
    "Singapore", "Hong Kong", "Bangkok", "Seoul", "Istanbul"
  )
  
  // HTTP Configuration
  val httpConfig = http
    .baseUrl(apiUrl)
    .acceptHeader("application/json")
    .acceptEncodingHeader("gzip, deflate")
    .userAgentHeader("Gatling Performance Test v1.0")
    .connectTimeout(5000)
    .requestTimeout(10000)
    .disableAutoRefresh
  
  // Scenario definitions
  
  /**
   * Get current weather for a random city
   */
  val getWeatherScenario = scenario("Get Weather")
    .exec(
      session =>
        session.set("city", cities(scala.util.Random.nextInt(cities.length)))
    )
    .exec(
      http("Get Weather for ${city}")
        .get("/weather/${city}")
        .check(status.is(200))
        .check(jsonPath("$.success").is("true"))
    )
    .pause(1 second, 3 seconds)
  
  /**
   * Get weather forecast for a random city
   */
  val getForecastScenario = scenario("Get Forecast")
    .exec(
      session =>
        session.set("city", cities(scala.util.Random.nextInt(cities.length)))
    )
    .exec(
      http("Get Forecast for ${city}")
        .get("/forecast/${city}?days=7")
        .check(status.is(200))
        .check(jsonPath("$.success").is("true"))
    )
    .pause(2 seconds, 4 seconds)
  
  /**
   * Search for cities
   */
  val searchScenario = scenario("Search Cities")
    .exec(
      session =>
        session.set("query", cities(scala.util.Random.nextInt(cities.length)).substring(0, 3))
    )
    .exec(
      http("Search for ${query}")
        .get("/search")
        .queryParam("q", "${query}")
        .check(status.is(200))
        .check(jsonPath("$.success").is("true"))
    )
    .pause(500 millis, 2 seconds)
  
  /**
   * Get search history
   */
  val historyScenario = scenario("Get History")
    .exec(
      http("Get History")
        .get("/history?limit=20&offset=0")
        .check(status.is(200))
        .check(jsonPath("$.success").is("true"))
    )
    .pause(1 second, 2 seconds)
  
  /**
   * Health check
   */
  val healthCheckScenario = scenario("Health Check")
    .exec(
      http("Health Check")
        .get("/health")
        .check(status.is(200))
    )
    .pause(500 millis)
  
  /**
   * Mixed workload - realistic user journey
   */
  val mixedWorkload = scenario("Mixed Workload")
    .exec(healthCheckScenario)
    .pause(1 second)
    .exec(
      session =>
        session.set("city", cities(scala.util.Random.nextInt(cities.length)))
    )
    .exec(
      http("Search City")
        .get("/search")
        .queryParam("q", "${city}")
        .check(status.is(200))
    )
    .pause(2 seconds)
    .exec(
      http("Get Current Weather")
        .get("/weather/${city}")
        .check(status.is(200))
    )
    .pause(1 second)
    .exec(
      http("Get Forecast")
        .get("/forecast/${city}?days=7")
        .check(status.is(200))
    )
    .pause(1 second)
    .exec(
      http("Get History")
        .get("/history")
        .check(status.is(200))
    )
}
