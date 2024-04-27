
# Create your models here.

from django.db import models
from django.contrib.auth.models import User
import datetime
import uuid

# Admin Model
class Movie(models.Model):
    title = models.CharField(max_length=255)
    genre = models.CharField(max_length=150,default='unknown')
    description=models.TextField()
    image_url=models.URLField(max_length=1000)
    is_enabled = models.BooleanField(default=True)
    ticket_price = models.DecimalField(max_digits=10, decimal_places=2, default=150)
  
    time1 = models.CharField(max_length=50)
    time2 = models.CharField(max_length=50)
    time3 = models.CharField(max_length=50)
    time4 = models.CharField(max_length=50)

    startDate = models.DateField(editable=True, default= datetime.date.today)
    endDate = models.DateField(editable=True, default= datetime.date.today)


#UserModel
class Booking(models.Model):
    
    title = models.ForeignKey(Movie, on_delete=models.CASCADE,default=1)
    date = models.CharField(max_length=500)
    time = models.CharField(max_length=50)
    no_of_seats=models.IntegerField()
    ticket_price = models.IntegerField(default=150)
    total_price =  models.IntegerField(default=150)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    booking_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    film_name = models.CharField(max_length=255, default='unknown')
   

# Razorpay related details

from django.db import models

class Payment(models.Model):
    order_id = models.CharField(max_length=100,  default='')
    amount = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return f"Order ID: {self.order_id}, Amount: {self.amount}, Status: {self.status}"