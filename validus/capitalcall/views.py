from django.shortcuts import render
from .models import DataCall, DataFundInvestment
import json
# Create your views here.


def submit(request):
    if request.method == 'POST':
        print("Post Request Submitted")
    inputVal = json.loads(request.POST.get('data', ''))
    print("Request:"+inputVal)
    return render(request, '<h1>Hello</h1>')
