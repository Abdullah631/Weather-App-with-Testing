package simulations

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._
import helpers.Common._

/**
 * Load Test Simulation
 * Tests the API under normal/expected load
 * 
 * Configuration:
 * - Ramp: 0 to 100 users over 60 seconds
 * - Duration: 300 seconds (5 minutes)
 * - Expected Response Time: < 500ms (95th percentile)
 */
class WeatherLoadTest extends Simulation {

  // Setup
  setUp(
    // Ramp up to 100 users over 60 seconds, maintain for 300 seconds
    mixedWorkload
      .inject(
        rampUsers(100).during(60 seconds)
      )
      .protocols(httpConfig)
  )
    .maxDuration(360 seconds) // Total 60s ramp + 300s test
    .assertions(
      global.responseTime.max.lt(2000), // Max response time < 2 seconds
      global.responseTime.percentile(95.0).lt(500), // 95th percentile < 500ms
      global.responseTime.mean.lt(300), // Average < 300ms
      global.successfulRequests.percent.gt(99.0), // > 99% success
      global.failedRequests.percent.lt(1.0), // < 1% failures
      forAllRequests.responseTime.percentile(99.0).lt(1000) // 99th percentile < 1s
    )
}
