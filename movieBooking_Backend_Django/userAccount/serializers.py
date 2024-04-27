from rest_framework import serializers
from adminAccount.models import Booking, Movie

# For movie description in view movie page
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'


# serializers.py for book tickets
class BookTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'


# After movie booking for details in confirmation screen

from rest_framework import serializers
from adminAccount.models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'