# Test Cases Document

**Project**: Weather Forecasting Web App  
**Version**: 1.0  
**Date**: December 14, 2025

---

## Test Cases Summary

This document outlines all test cases for the Weather Forecasting Web Application covering functional, performance, and security aspects.

---

## 1. API Endpoint Test Cases

### TC-001: Get Current Weather - Valid City

| Field | Value |
|-------|-------|
| **Test ID** | TC-001 |
| **Endpoint** | GET /api/weather/:city |
| **Test Type** | Functional |
| **Prerequisites** | API Server running, Valid city name |
| **Test Data** | city = "London" |
| **Steps** | 1. Send GET request to /api/weather/London |
| **Expected Result** | HTTP 200, JSON response with weather data |
| **Actual Result** | ✅ Pass |
| **Status** | PASS |

---

### TC-002: Get Current Weather - Invalid City

| Field | Value |
|-------|-------|
| **Test ID** | TC-002 |
| **Endpoint** | GET /api/weather/:city |
| **Test Type** | Negative |
| **Prerequisites** | API Server running |
| **Test Data** | city = "InvalidCityXYZ123" |
| **Steps** | 1. Send GET request to /api/weather/InvalidCityXYZ123 |
| **Expected Result** | HTTP 400, Error message "City not found" |
| **Actual Result** | ✅ Pass |
| **Status** | PASS |

---

### TC-003: Get Current Weather - Empty Parameter

| Field | Value |
|-------|-------|
| **Test ID** | TC-003 |
| **Endpoint** | GET /api/weather |
| **Test Type** | Negative |
| **Prerequisites** | API Server running |
| **Test Data** | No city parameter |
| **Steps** | 1. Send GET request to /api/weather (no path param) |
| **Expected Result** | HTTP 400, Validation error |
| **Actual Result** | ✅ Pass |
| **Status** | PASS |

---

### TC-004: Get Weather Forecast - Valid Parameters

| Field | Value |
|-------|-------|
| **Test ID** | TC-004 |
| **Endpoint** | GET /api/forecast/:city |
| **Test Type** | Functional |
| **Prerequisites** | API Server running |
| **Test Data** | city = "Paris", days = 7 |
| **Steps** | 1. Send GET request to /api/forecast/Paris?days=7 |
| **Expected Result** | HTTP 200, 7-day forecast data |
| **Actual Result** | ✅ Pass |
| **Status** | PASS |

---

### TC-005: Get Weather Forecast - Days Out of Range

| Field | Value |
|-------|-------|
| **Test ID** | TC-005 |
| **Endpoint** | GET /api/forecast/:city |
| **Test Type** | Negative |
| **Prerequisites** | API Server running |
| **Test Data** | city = "Paris", days = 15 |
| **Steps** | 1. Send GET request to /api/forecast/Paris?days=15 |
| **Expected Result** | HTTP 200, defaults to 7 days |
| **Actual Result** | ✅ Pass |
| **Status** | PASS |

---

### TC-006: Search Cities - Valid Query

| Field | Value |
|-------|-------|
| **Test ID** | TC-006 |
| **Endpoint** | GET /api/search |
| **Test Type** | Functional |
| **Prerequisites** | API Server running |
| **Test Data** | q = "Lon" |
| **Steps** | 1. Send GET request to /api/search?q=Lon |
| **Expected Result** | HTTP 200, Array of matching cities (London, etc.) |
| **Actual Result** | ✅ Pass |
| **Status** | PASS |

---

### TC-007: Search Cities - Empty Query

| Field | Value |
|-------|-------|
| **Test ID** | TC-007 |
| **Endpoint** | GET /api/search |
| **Test Type** | Negative |
| **Prerequisites** | API Server running |
| **Test Data** | q = "" |
| **Steps** | 1. Send GET request to /api/search?q= |
| **Expected Result** | HTTP 400, Validation error |
| **Actual Result** | ✅ Pass |
| **Status** | PASS |

---

### TC-008: Get Search History

| Field | Value |
|-------|-------|
| **Test ID** | TC-008 |
| **Endpoint** | GET /api/history |
| **Test Type** | Functional |
| **Prerequisites** | API Server running |
| **Test Data** | limit = 20, offset = 0 |
| **Steps** | 1. Send GET request to /api/history?limit=20&offset=0 |
| **Expected Result** | HTTP 200, Array of history entries |
| **Actual Result** | ✅ Pass |
| **Status** | PASS |

---

### TC-009: Add to History

| Field | Value |
|-------|-------|
| **Test ID** | TC-009 |
| **Endpoint** | POST /api/history |
| **Test Type** | Functional |
| **Prerequisites** | API Server running |
| **Test Data** | { "city": "Tokyo", "temperature": 15.5, "condition": "Rainy" } |
| **Steps** | 1. Send POST request with JSON body |
| **Expected Result** | HTTP 201, Entry added to history |
| **Actual Result** | ✅ Pass |
| **Status** | PASS |

---

### TC-010: Delete History Entry

| Field | Value |
|-------|-------|
| **Test ID** | TC-010 |
| **Endpoint** | DELETE /api/history/:id |
| **Test Type** | Functional |
| **Prerequisites** | API Server running, Valid history ID |
| **Test Data** | id = "valid_entry_id" |
| **Steps** | 1. Send DELETE request for valid ID |
| **Expected Result** | HTTP 200, Entry removed |
| **Actual Result** | ✅ Pass |
| **Status** | PASS |

---

### TC-011: Clear All History

| Field | Value |
|-------|-------|
| **Test ID** | TC-011 |
| **Endpoint** | DELETE /api/history |
| **Test Type** | Functional |
| **Prerequisites** | API Server running, History exists |
| **Test Data** | None |
| **Steps** | 1. Send DELETE request to /api/history |
| **Expected Result** | HTTP 200, All history cleared |
| **Actual Result** | ✅ Pass |
| **Status** | PASS |

---

### TC-012: Health Check Endpoint

| Field | Value |
|-------|-------|
| **Test ID** | TC-012 |
| **Endpoint** | GET /api/health |
| **Test Type** | Functional |
| **Prerequisites** | API Server running |
| **Test Data** | None |
| **Steps** | 1. Send GET request to /api/health |
| **Expected Result** | HTTP 200, { "status": "OK" } |
| **Actual Result** | ✅ Pass |
| **Status** | PASS |

---

## 2. Performance Test Cases

### TC-P-001: Load Test - 100 Concurrent Users

| Field | Value |
|-------|-------|
| **Test ID** | TC-P-001 |
| **Test Type** | Load Test |
| **Configuration** | 100 users, 60s ramp-up, 300s duration |
| **Expected Response Time** | Avg < 300ms, 95th < 500ms |
| **Expected Throughput** | > 100 TPS |
| **Expected Error Rate** | 0% |
| **Success Criteria** | All KPIs met |
| **Status** | PENDING |

---

### TC-P-002: Stress Test - 2000 Concurrent Users

| Field | Value |
|-------|-------|
| **Test ID** | TC-P-002 |
| **Test Type** | Stress Test |
| **Configuration** | Ramp to 2000 users over 300s, sustain 600s |
| **Expected Breaking Point** | 1000-1500 users |
| **Expected Error Rate** | < 5% at peak |
| **Success Criteria** | Graceful degradation, no crashes |
| **Status** | PENDING |

---

### TC-P-003: Spike Test - Sudden 1000 User Spike

| Field | Value |
|-------|-------|
| **Test ID** | TC-P-003 |
| **Test Type** | Spike Test |
| **Configuration** | Normal 100 → Spike 1000 (30s) → Recovery |
| **Expected Behavior** | Handles spike, recovers within 2 min |
| **Expected Error Rate** | < 2% during spike |
| **Success Criteria** | No crash, recovery successful |
| **Status** | PENDING |

---

### TC-P-004: Endurance Test - 1 Hour at 200 Users

| Field | Value |
|-------|-------|
| **Test ID** | TC-P-004 |
| **Test Type** | Endurance Test |
| **Configuration** | 200 constant users, 3600s duration |
| **Memory Leak Check** | Monitor heap usage |
| **Expected Result** | Stable response times, no memory leaks |
| **Success Criteria** | Performance consistent throughout |
| **Status** | PENDING |

---

## 3. Security Test Cases

### TC-S-001: SQL Injection Prevention

| Field | Value |
|-------|-------|
| **Test ID** | TC-S-001 |
| **Test Type** | Security |
| **Attack Vector** | city = "London'; DROP TABLE weather;--" |
| **Expected Result** | Request rejected, no database modification |
| **Status** | PASS |

---

### TC-S-002: XSS Prevention

| Field | Value |
|-------|-------|
| **Test ID** | TC-S-002 |
| **Test Type** | Security |
| **Attack Vector** | city = "<script>alert('XSS')</script>" |
| **Expected Result** | Input sanitized, no script execution |
| **Status** | PASS |

---

### TC-S-003: Rate Limiting

| Field | Value |
|-------|-------|
| **Test ID** | TC-S-003 |
| **Test Type** | Security |
| **Attack Vector** | 150 requests in 15 minutes from single IP |
| **Expected Result** | HTTP 429 (Too Many Requests) after 100 requests |
| **Status** | PASS |

---

### TC-S-004: CORS Configuration

| Field | Value |
|-------|-------|
| **Test ID** | TC-S-004 |
| **Test Type** | Security |
| **Test Step** | Request from unauthorized domain |
| **Expected Result** | CORS header validation, request blocked if domain not whitelisted |
| **Status** | PASS |

---

## 4. Frontend Test Cases

### TC-F-001: Home Page Load

| Field | Value |
|-------|-------|
| **Test ID** | TC-F-001 |
| **Test Type** | Functional |
| **Steps** | 1. Open app in browser 2. Verify home page renders |
| **Expected Result** | Page loads, displays weather for default city |
| **Status** | PASS |

---

### TC-F-002: Search Functionality

| Field | Value |
|-------|-------|
| **Test ID** | TC-F-002 |
| **Test Type** | Functional |
| **Steps** | 1. Click search 2. Enter city name 3. Submit |
| **Expected Result** | Search results displayed, weather updated |
| **Status** | PASS |

---

### TC-F-003: Temperature Unit Toggle

| Field | Value |
|-------|-------|
| **Test ID** | TC-F-003 |
| **Test Type** | Functional |
| **Steps** | 1. Click unit toggle 2. Verify conversion |
| **Expected Result** | Temperature displayed in selected unit (°C or °F) |
| **Status** | PASS |

---

### TC-F-004: Navigation Between Pages

| Field | Value |
|-------|-------|
| **Test ID** | TC-F-004 |
| **Test Type** | Functional |
| **Steps** | 1. Click each navigation link |
| **Expected Result** | All pages load correctly |
| **Status** | PASS |

---

### TC-F-005: Forecast Display

| Field | Value |
|-------|-------|
| **Test ID** | TC-F-005 |
| **Test Type** | Functional |
| **Steps** | 1. Go to Forecast page 2. Select number of days 3. View forecast |
| **Expected Result** | 7-day forecast displayed with hourly details |
| **Status** | PASS |

---

### TC-F-006: History Management

| Field | Value |
|-------|-------|
| **Test ID** | TC-F-006 |
| **Test Type** | Functional |
| **Steps** | 1. Go to History 2. Verify entries 3. Delete entry 4. Export CSV |
| **Expected Result** | History operations work correctly |
| **Status** | PASS |

---

## Test Execution Summary

| Category | Total | Pass | Fail | Pending |
|----------|-------|------|------|---------|
| **Functional API** | 12 | 12 | 0 | 0 |
| **Performance** | 4 | 0 | 0 | 4 |
| **Security** | 4 | 4 | 0 | 0 |
| **Frontend** | 6 | 6 | 0 | 0 |
| **TOTAL** | 26 | 22 | 0 | 4 |

---

**Overall Status**: ✅ ON TRACK

Performance tests scheduled for execution phase.

---

**Document Owner**: BSEF22M546  
**Last Updated**: December 14, 2025
