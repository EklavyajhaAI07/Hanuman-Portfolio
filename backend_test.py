#!/usr/bin/env python3
"""
Backend API Test Suite for Hanuman Knowledge Base
Tests all API endpoints for proper functionality and data structure
"""

import requests
import json
import sys
from typing import Dict, Any

# Base URL from environment
BASE_URL = "https://divine-hanuman-hub.preview.emergentagent.com/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'

def print_test(test_name: str, status: str, message: str = ""):
    """Print formatted test result"""
    if status == "PASS":
        print(f"{Colors.GREEN}✓ PASS{Colors.END} - {test_name}")
        if message:
            print(f"  {Colors.BLUE}→{Colors.END} {message}")
    elif status == "FAIL":
        print(f"{Colors.RED}✗ FAIL{Colors.END} - {test_name}")
        if message:
            print(f"  {Colors.RED}→{Colors.END} {message}")
    elif status == "INFO":
        print(f"{Colors.YELLOW}ℹ INFO{Colors.END} - {test_name}")
        if message:
            print(f"  {Colors.YELLOW}→{Colors.END} {message}")

def test_health_check():
    """Test GET /api/ - Health check"""
    print("\n" + "="*60)
    print("TEST 1: Health Check Endpoint")
    print("="*60)
    
    try:
        response = requests.get(f"{BASE_URL}/", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if 'status' in data and data['status'] == 'ok':
                print_test("Health check endpoint", "PASS", f"Status: {data.get('status')}, Message: {data.get('message')}")
                return True
            else:
                print_test("Health check endpoint", "FAIL", f"Missing 'status' field or status != 'ok'. Response: {data}")
                return False
        else:
            print_test("Health check endpoint", "FAIL", f"Status code: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print_test("Health check endpoint", "FAIL", f"Exception: {str(e)}")
        return False

def test_get_all_events():
    """Test GET /api/events - Get all events"""
    print("\n" + "="*60)
    print("TEST 2: Get All Events")
    print("="*60)
    
    try:
        response = requests.get(f"{BASE_URL}/events", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            
            if 'events' not in data:
                print_test("Get all events", "FAIL", "Missing 'events' field in response")
                return False
            
            events = data['events']
            count = data.get('count', len(events))
            
            print_test("Get all events - Response structure", "PASS", f"Found {count} events")
            
            # Check if we have at least 10 events
            if len(events) >= 10:
                print_test("Get all events - Count check", "PASS", f"Expected at least 10 events, got {len(events)}")
            else:
                print_test("Get all events - Count check", "FAIL", f"Expected at least 10 events, got {len(events)}")
                return False
            
            # Validate first event structure
            if events:
                event = events[0]
                required_fields = ['id', 'title', 'summary', 'description', 'scripture', 
                                 'chapter', 'verse', 'sanskrit', 'hindi', 'english', 
                                 'era', 'category', 'relatedCharacters', 'relatedPlaces']
                
                missing_fields = [field for field in required_fields if field not in event]
                
                if not missing_fields:
                    print_test("Event data structure", "PASS", f"All required fields present")
                    print_test("Sample event", "INFO", f"Title: {event.get('title')}, Scripture: {event.get('scripture')}, Chapter: {event.get('chapter')}, Verse: {event.get('verse')}")
                    return True
                else:
                    print_test("Event data structure", "FAIL", f"Missing fields: {missing_fields}")
                    return False
            else:
                print_test("Get all events", "FAIL", "No events returned")
                return False
        else:
            print_test("Get all events", "FAIL", f"Status code: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print_test("Get all events", "FAIL", f"Exception: {str(e)}")
        return False

def test_filter_events_by_category():
    """Test GET /api/events?category=leela - Filter by category"""
    print("\n" + "="*60)
    print("TEST 3: Filter Events by Category")
    print("="*60)
    
    try:
        response = requests.get(f"{BASE_URL}/events?category=leela", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            events = data.get('events', [])
            
            if not events:
                print_test("Filter by category", "FAIL", "No events returned for category 'leela'")
                return False
            
            # Check if all events have category 'leela'
            all_leela = all(event.get('category') == 'leela' for event in events)
            
            if all_leela:
                print_test("Filter by category", "PASS", f"Found {len(events)} events with category 'leela'")
                return True
            else:
                print_test("Filter by category", "FAIL", "Some events don't have category 'leela'")
                return False
        else:
            print_test("Filter by category", "FAIL", f"Status code: {response.status_code}")
            return False
    except Exception as e:
        print_test("Filter by category", "FAIL", f"Exception: {str(e)}")
        return False

def test_get_single_event():
    """Test GET /api/events/1 - Get single event with related events"""
    print("\n" + "="*60)
    print("TEST 4: Get Single Event with Related Events")
    print("="*60)
    
    try:
        response = requests.get(f"{BASE_URL}/events/1", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            
            if 'event' not in data:
                print_test("Get single event", "FAIL", "Missing 'event' field in response")
                return False
            
            event = data['event']
            related = data.get('related', [])
            
            # Check event structure
            required_fields = ['id', 'title', 'description', 'scripture', 'chapter', 
                             'verse', 'sanskrit', 'hindi', 'english']
            missing_fields = [field for field in required_fields if field not in event]
            
            if missing_fields:
                print_test("Single event structure", "FAIL", f"Missing fields: {missing_fields}")
                return False
            
            print_test("Single event structure", "PASS", f"Event ID: {event.get('id')}, Title: {event.get('title')}")
            print_test("Scripture citation", "PASS", f"Scripture: {event.get('scripture')}, Chapter: {event.get('chapter')}, Verse: {event.get('verse')}")
            print_test("Translations", "PASS", f"Sanskrit: {'Present' if event.get('sanskrit') else 'Missing'}, Hindi: {'Present' if event.get('hindi') else 'Missing'}, English: {'Present' if event.get('english') else 'Missing'}")
            
            # Check related events
            if isinstance(related, list):
                print_test("Related events", "PASS", f"Found {len(related)} related events")
                return True
            else:
                print_test("Related events", "FAIL", "Related events is not a list")
                return False
        else:
            print_test("Get single event", "FAIL", f"Status code: {response.status_code}")
            return False
    except Exception as e:
        print_test("Get single event", "FAIL", f"Exception: {str(e)}")
        return False

def test_get_powers():
    """Test GET /api/powers - Get all powers"""
    print("\n" + "="*60)
    print("TEST 5: Get All Powers")
    print("="*60)
    
    try:
        response = requests.get(f"{BASE_URL}/powers", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            
            if 'powers' not in data:
                print_test("Get powers", "FAIL", "Missing 'powers' field in response")
                return False
            
            powers = data['powers']
            
            if len(powers) >= 5:
                print_test("Get powers - Count", "PASS", f"Found {len(powers)} powers (expected at least 5)")
            else:
                print_test("Get powers - Count", "FAIL", f"Expected at least 5 powers, got {len(powers)}")
                return False
            
            # Check power structure
            if powers:
                power = powers[0]
                required_fields = ['id', 'title', 'description', 'details', 'scripture', 'verse']
                missing_fields = [field for field in required_fields if field not in power]
                
                if not missing_fields:
                    print_test("Power data structure", "PASS", "All required fields present")
                    print_test("Sample power", "INFO", f"Title: {power.get('title')}, Scripture: {power.get('scripture')}")
                    return True
                else:
                    print_test("Power data structure", "FAIL", f"Missing fields: {missing_fields}")
                    return False
        else:
            print_test("Get powers", "FAIL", f"Status code: {response.status_code}")
            return False
    except Exception as e:
        print_test("Get powers", "FAIL", f"Exception: {str(e)}")
        return False

def test_get_teachings():
    """Test GET /api/teachings - Get all teachings"""
    print("\n" + "="*60)
    print("TEST 6: Get All Teachings")
    print("="*60)
    
    try:
        response = requests.get(f"{BASE_URL}/teachings", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            
            if 'teachings' not in data:
                print_test("Get teachings", "FAIL", "Missing 'teachings' field in response")
                return False
            
            teachings = data['teachings']
            
            if len(teachings) >= 3:
                print_test("Get teachings - Count", "PASS", f"Found {len(teachings)} teachings (expected at least 3)")
                return True
            else:
                print_test("Get teachings - Count", "FAIL", f"Expected at least 3 teachings, got {len(teachings)}")
                return False
        else:
            print_test("Get teachings", "FAIL", f"Status code: {response.status_code}")
            return False
    except Exception as e:
        print_test("Get teachings", "FAIL", f"Exception: {str(e)}")
        return False

def test_get_temples():
    """Test GET /api/temples - Get all temples"""
    print("\n" + "="*60)
    print("TEST 7: Get All Temples")
    print("="*60)
    
    try:
        response = requests.get(f"{BASE_URL}/temples", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            
            if 'temples' not in data:
                print_test("Get temples", "FAIL", "Missing 'temples' field in response")
                return False
            
            temples = data['temples']
            
            if len(temples) >= 5:
                print_test("Get temples - Count", "PASS", f"Found {len(temples)} temples (expected at least 5)")
                return True
            else:
                print_test("Get temples - Count", "FAIL", f"Expected at least 5 temples, got {len(temples)}")
                return False
        else:
            print_test("Get temples", "FAIL", f"Status code: {response.status_code}")
            return False
    except Exception as e:
        print_test("Get temples", "FAIL", f"Exception: {str(e)}")
        return False

def test_get_relationships():
    """Test GET /api/relationships - Get all relationships"""
    print("\n" + "="*60)
    print("TEST 8: Get All Relationships")
    print("="*60)
    
    try:
        response = requests.get(f"{BASE_URL}/relationships", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            
            if 'relationships' not in data:
                print_test("Get relationships", "FAIL", "Missing 'relationships' field in response")
                return False
            
            relationships = data['relationships']
            
            if len(relationships) >= 5:
                print_test("Get relationships - Count", "PASS", f"Found {len(relationships)} relationships (expected at least 5)")
                return True
            else:
                print_test("Get relationships - Count", "FAIL", f"Expected at least 5 relationships, got {len(relationships)}")
                return False
        else:
            print_test("Get relationships", "FAIL", f"Status code: {response.status_code}")
            return False
    except Exception as e:
        print_test("Get relationships", "FAIL", f"Exception: {str(e)}")
        return False

def test_get_timeline():
    """Test GET /api/timeline - Get timeline data"""
    print("\n" + "="*60)
    print("TEST 9: Get Timeline Data")
    print("="*60)
    
    try:
        response = requests.get(f"{BASE_URL}/timeline", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            
            if 'timeline' not in data:
                print_test("Get timeline", "FAIL", "Missing 'timeline' field in response")
                return False
            
            timeline = data['timeline']
            
            if timeline and len(timeline) > 0:
                print_test("Get timeline", "PASS", f"Found {len(timeline)} timeline events")
                
                # Check timeline event structure
                event = timeline[0]
                required_fields = ['id', 'title', 'summary', 'era', 'category']
                missing_fields = [field for field in required_fields if field not in event]
                
                if not missing_fields:
                    print_test("Timeline event structure", "PASS", "All required fields present")
                    return True
                else:
                    print_test("Timeline event structure", "FAIL", f"Missing fields: {missing_fields}")
                    return False
            else:
                print_test("Get timeline", "FAIL", "No timeline events returned")
                return False
        else:
            print_test("Get timeline", "FAIL", f"Status code: {response.status_code}")
            return False
    except Exception as e:
        print_test("Get timeline", "FAIL", f"Exception: {str(e)}")
        return False

def test_search():
    """Test GET /api/search?q=ocean - Search functionality"""
    print("\n" + "="*60)
    print("TEST 10: Search Functionality")
    print("="*60)
    
    try:
        response = requests.get(f"{BASE_URL}/search?q=ocean", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            
            if 'results' not in data:
                print_test("Search endpoint", "FAIL", "Missing 'results' field in response")
                return False
            
            results = data['results']
            count = data.get('count', len(results))
            
            if results and len(results) > 0:
                print_test("Search functionality", "PASS", f"Found {count} results for query 'ocean'")
                
                # Check if results are relevant
                result = results[0]
                if 'title' in result and 'type' in result:
                    print_test("Search result structure", "PASS", f"Type: {result.get('type')}, Title: {result.get('title')}")
                    return True
                else:
                    print_test("Search result structure", "FAIL", "Missing 'title' or 'type' field")
                    return False
            else:
                print_test("Search functionality", "FAIL", "No results found for query 'ocean'")
                return False
        else:
            print_test("Search endpoint", "FAIL", f"Status code: {response.status_code}")
            return False
    except Exception as e:
        print_test("Search endpoint", "FAIL", f"Exception: {str(e)}")
        return False

def test_chat_endpoint():
    """Test POST /api/chat - AI chatbot"""
    print("\n" + "="*60)
    print("TEST 11: AI Chatbot Endpoint")
    print("="*60)
    
    try:
        payload = {
            "message": "Tell me about Hanuman's powers",
            "history": []
        }
        
        response = requests.post(f"{BASE_URL}/chat", json=payload, timeout=15)
        
        if response.status_code == 200:
            data = response.json()
            
            if 'response' not in data:
                print_test("Chat endpoint", "FAIL", "Missing 'response' field in response")
                return False
            
            if 'sources' not in data:
                print_test("Chat endpoint", "FAIL", "Missing 'sources' field in response")
                return False
            
            chat_response = data['response']
            sources = data['sources']
            
            if chat_response and len(chat_response) > 0:
                print_test("Chat response", "PASS", f"Received response with {len(chat_response)} characters")
                print_test("Chat response preview", "INFO", f"{chat_response[:150]}...")
            else:
                print_test("Chat response", "FAIL", "Empty response received")
                return False
            
            if isinstance(sources, list):
                print_test("Chat sources", "PASS", f"Received {len(sources)} sources")
                if sources:
                    source = sources[0]
                    print_test("Source structure", "INFO", f"Title: {source.get('title')}, Type: {source.get('type')}, Scripture: {source.get('scripture')}")
                return True
            else:
                print_test("Chat sources", "FAIL", "Sources is not a list")
                return False
        else:
            print_test("Chat endpoint", "FAIL", f"Status code: {response.status_code}, Response: {response.text}")
            return False
    except Exception as e:
        print_test("Chat endpoint", "FAIL", f"Exception: {str(e)}")
        return False

def run_all_tests():
    """Run all backend tests"""
    print("\n" + "="*60)
    print("HANUMAN KNOWLEDGE BASE - BACKEND API TEST SUITE")
    print("="*60)
    print(f"Base URL: {BASE_URL}")
    print("="*60)
    
    results = []
    
    # Run all tests
    results.append(("Health Check", test_health_check()))
    results.append(("Get All Events", test_get_all_events()))
    results.append(("Filter Events by Category", test_filter_events_by_category()))
    results.append(("Get Single Event", test_get_single_event()))
    results.append(("Get Powers", test_get_powers()))
    results.append(("Get Teachings", test_get_teachings()))
    results.append(("Get Temples", test_get_temples()))
    results.append(("Get Relationships", test_get_relationships()))
    results.append(("Get Timeline", test_get_timeline()))
    results.append(("Search Functionality", test_search()))
    results.append(("AI Chat Endpoint", test_chat_endpoint()))
    
    # Print summary
    print("\n" + "="*60)
    print("TEST SUMMARY")
    print("="*60)
    
    passed = sum(1 for _, result in results if result)
    failed = len(results) - passed
    
    for test_name, result in results:
        status = f"{Colors.GREEN}PASS{Colors.END}" if result else f"{Colors.RED}FAIL{Colors.END}"
        print(f"{status} - {test_name}")
    
    print("="*60)
    print(f"Total Tests: {len(results)}")
    print(f"{Colors.GREEN}Passed: {passed}{Colors.END}")
    print(f"{Colors.RED}Failed: {failed}{Colors.END}")
    print("="*60)
    
    return failed == 0

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)
