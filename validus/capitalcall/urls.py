from rest_framework import routers
from django.urls import path, include
from .api import DataFundViewSet, DataCallViewSet, DataCommitmentViewSet, DataFundInvestmentViewSet
from .views import submit


router = routers.DefaultRouter()
router.register('datafund', DataFundViewSet, basename='datafund')
router.register('datacall', DataCallViewSet, basename='datacall')
router.register('datacommitment', DataCommitmentViewSet,
                basename='datacommitment')
router.register('datafundinvestment', DataFundInvestmentViewSet,
                basename='datafundinvestment')

#urlpattern = router.urls
urlpatterns = [
    path('', include(router.urls)),
    path('submit', submit, name='Submit'),
]
