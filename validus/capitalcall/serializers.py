from rest_framework import serializers
from capitalcall.models import DataFund, DataCall, DataCommitment, DataFundInvestment

class DataFundSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataFund
        fields = ['fund_id', 'fund_name']

class DataCallSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataCall
        fields = ['call_id', 'date', 'investment_name', 'capital_requiement']

class DataCommitmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataCommitment
        fields = ['commitment_id', 'fund_id', 'date', 'amount']

class DataFundInvestmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataFundInvestment
        fields = ['id', 'call_id', 'commitment_id', 'fund_id', 'investment_amount']
