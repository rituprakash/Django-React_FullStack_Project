# Create your views here.

from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from django.contrib.auth.forms import UserCreationForm
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.authtoken.models import Token
from userAccount.forms import BookingForm
from adminAccount.models import Booking
from .serializers import BookingSerializer
from adminAccount.models import Movie
from adminAccount.serializers import MovieSerializer
from django.contrib.auth import logout
from django.http import JsonResponse
from rest_framework import status
from .forms import CustomUserCreationForm  
from django.contrib.auth import authenticate
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User  # Import User model
from .serializers import BookTicketSerializer
from .forms import BookingForm
from adminAccount.models import Booking
from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth import logout
from adminAccount.models import Payment
from .serializers import PaymentSerializer
import razorpay



#User sign up
@api_view(['POST'])
@permission_classes([AllowAny])
def signup_user(request):
    serializer = CustomUserCreationForm(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Account created successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# User login API
@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'userId': user.id, 'token': token.key, 'email': user.email}, status=HTTP_200_OK)



#User Movie Listing
@api_view(['GET'])
@permission_classes([AllowAny])
def movie_Listing(request):
    # Retrieve movies created by the admin and are enabled
    movies = Movie.objects.filter(is_enabled=True)
    serializer = BookingSerializer(movies, many=True)
    return Response(serializer.data)



# User Movie View
@api_view(['GET'])
@permission_classes([AllowAny])
def view_movie(request, id):
    try:
        movie = Movie.objects.get(pk=id)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = BookingSerializer(movie)
    return Response(serializer.data)


 # User Movie Ticket Booking API
@api_view(['POST'])
@permission_classes((AllowAny,))
def movie_Booking(request):
    serializer = BookTicketSerializer(data=request.data)
    if serializer.is_valid():
        booking = serializer.save()
        serialized_data = BookTicketSerializer(booking).data
        return Response(serialized_data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Booking History
@api_view(['GET'])
@permission_classes((AllowAny,))
def booking_history(request, user_id):
    try:
        # Fetch the booking history for the provided user_id
        bookings = Booking.objects.filter(user_id=user_id)
        
        # Check if there are any bookings for the user
        if not bookings.exists():
            return Response({"message": "No previous bookings"}, status=404)
    
        # Serialize the booking objects
        serializer = BookTicketSerializer(bookings, many=True)
        
        # Return the serialized booking data in the response
        return Response(serializer.data)
    
    except Exception as e:
        return Response({"message": str(e)}, status=500)




# EMAIL Sending
@api_view(['POST'])
@permission_classes((AllowAny,))
def send_email(request):
    if request.method == 'POST':
        recipient_email = request.data.get('recipient_email')
        subject = request.data.get('subject')
        message = request.data.get('message')

        if recipient_email and subject and message:
            try:
                # Send email
                send_mail(
                    subject=subject,
                    message=message,
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[recipient_email],
                    fail_silently=False,
                )
                return Response({'message': 'Email sent successfully'}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': 'Failed to send email'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'error': 'Missing required data in request'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)




#User Logout
@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def user_logout(request):
    print("Inside user_logout view")
    logout(request)
    return JsonResponse({'message': 'User logged out successfully'})


#Razorpay Api
@api_view(['POST'])
@permission_classes([AllowAny])
def generate_order(request):
    client = razorpay.Client(auth=('rzp_test_6TYuHFJTCqolOm', 'D2Vw9hDEPdBGcdnzGBTcepRq'))
    amount = int(request.data.get('amount')) 
    order = client.order.create({'amount': amount * 100, 'currency': 'INR'})  # Convert amount to paise
    payment = Payment.objects.create(order_id=order['id'], amount=amount)
    serializer = PaymentSerializer(payment)
    return Response(serializer.data)