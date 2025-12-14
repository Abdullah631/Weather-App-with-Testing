package simulations

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._
import helpers.Common._

/**
 * Spike Test Simulation
 * Tests sudden traffic bursts
 * 
 * Configuration:
 * - Normal: 100 concurrent users
 * - Spike: 1000 concurrent users (sudden)
 * - Spike Duration: 30 seconds
 * - Recovery: 5 minutes to return to normal
 */
class WeatherSpikeTest extends Simulation {

  // Setup
  setUp(
    mixedWorkload
      .inject(
        constantUsersPerSec(1.67).during(60 seconds), // 100 users (100/60)
        rampUsersPerSec(1.67).to(16.67).during(10 seconds), // Spike to 1000 users
        constantUsersPerSec(16.67).during(30 seconds), // Hold spike for 30s
        rampUsersPerSec(16.67).to(1.67).during(10 seconds), // Ramp down
        constantUsersPerSec(1.67).during(240 seconds) // Recovery period
      )
      .protocols(httpConfig)
  )
    .maxDuration(600 seconds)
    .assertions(
      global.responseTime.percentile(95.0).lt(1000), // 95th percentile < 1s even during spike
      global.failedRequests.percent.lt(2.0), // < 2% failures during spike
      forAllRequests.responseTime.percentile(99.0).lt(2000), // 99th percentile < 2s
      global.successfulRequests.percent.gt(98.0) // > 98% success rate
    )
}
