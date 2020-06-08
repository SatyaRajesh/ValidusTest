from django.db import models


class DataFund(models.Model):
    fund_id = models.AutoField(primary_key=True)
    fund_name = models.CharField(max_length=255)


class DataCommitment(models.Model):
    commitment_id = models.AutoField(primary_key=True)
    fund_id = models.IntegerField(default=0)
    date = models.DateField()
    amount = models.DecimalField(max_digits=15, decimal_places=2)


class DataCall(models.Model):
    call_id = models.AutoField(primary_key=True)
    date = models.DateField()
    investment_name = models.CharField(max_length=255)
    capital_requiement = models.DecimalField(max_digits=15, decimal_places=2)


class DataFundInvestment(models.Model):
    call_id = models.IntegerField(default=0)
    commitment_id = models.IntegerField(default=0)
    fund_id = models.IntegerField(default=0)
    investment_amount = models.DecimalField(max_digits=15, decimal_places=2)
