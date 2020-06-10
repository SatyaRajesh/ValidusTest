from django.test import TestCase
from library.models import DataCall


class TestDataCallForm(TestCase):
    def test_can_send_data_call_message(self):
        data ={
        "call_id": 1,
        "date": "2018-01-31",
        "investment_name": "Investment 1",
        "capital_requiement": "9500000.00"
        }

        response = self.client.post("/datacall/", data=data)
        self.assertEqual(DataCall.objects.count(), 1)