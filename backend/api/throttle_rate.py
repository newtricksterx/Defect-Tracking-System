from rest_framework.throttling import UserRateThrottle

class TokenRefreshThrottle(UserRateThrottle):
    rate = '10/second'  # Limit to 1 request per minute for this endpoint