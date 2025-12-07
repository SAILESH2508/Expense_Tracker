from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
import razorpay

client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

@api_view(['POST'])
def create_order(request):
    amount = request.data.get('amount')
    currency = 'INR'
    
    data = {
        'amount': amount * 100, # Razorpay expects amount in paise
        'currency': currency,
        'payment_capture': '1'
    }
    
    try:
        order = client.order.create(data=data)
        return Response(order)
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['POST'])
def verify_payment(request):
    try:
        data = request.data
        client.utility.verify_payment_signature(data)
        return Response({'status': 'Payment Verified'})
    except Exception as e:
        return Response({'error': str(e)}, status=400)
