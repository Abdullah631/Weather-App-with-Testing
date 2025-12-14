package simulations

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._
import helpers.Common._

/**
 * Stress Test Simulation
 * Tests the API until it reaches breaking point
 * 
 * Configuration:
 * - Ramp: 100 to 2000 users over 300 seconds
 * - Sustain: 600 seconds at peak
 * - Goal: Identify breaking point and error threshold
 */
class WeatherStressTest extends Simulation {

  // Setup
  setUp(
    mixedWorkload
      .inject(
        rampUsers(2000).during(300 seconds), // Ramp from 0 to 2000 users
        constantUsersPerSec(1).during(600 seconds) // Sustain peak load
      )
      .protocols(httpConfig)
  )
    .maxDuration(900 seconds)
    .assertions(
      global.responseTime.max.lt(5000), // Max response time < 5 seconds during stress
      global.responseTime.percentile(95.0).lt(2000), // 95th percentile < 2s during stress
      global.failedRequests.percent.lt(5.0), // Allow up to 5% failures under stress
      forAllRequests.responseTime.percentile(99.0).lt(3000) // 99th percentile < 3s
    )
}
