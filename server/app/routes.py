from webapp2 import Route
from webapp2_extras.routes import PathPrefixRoute

ROUTES = [
    PathPrefixRoute('/api', [
        ]),
    PathPrefixRoute('/admin', [
    ]),
]
