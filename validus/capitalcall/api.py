from .models import DataFund, DataCall, DataCommitment, DataFundInvestment
from rest_framework import viewsets, permissions
from .serializers import DataFundSerializer, DataCallSerializer, DataCommitmentSerializer, DataFundInvestmentSerializer


class DataFundViewSet(viewsets.ModelViewSet):
    queryset = DataFund.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = DataFundSerializer


class DataCallViewSet(viewsets.ModelViewSet):
    queryset = DataCall.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = DataCallSerializer


class DataCommitmentViewSet(viewsets.ModelViewSet):
    queryset = DataCommitment.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = DataCommitmentSerializer


class DataFundInvestmentViewSet(viewsets.ModelViewSet):
    queryset = DataFundInvestment.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = DataFundInvestmentSerializer
