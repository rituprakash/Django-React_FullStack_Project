
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [

    # path('user_signup/',views.signup_user, name='user_signup'),
    # path('user_login/', views.login_user, name='user_login'),
    path('movie_Listing/', views. movie_Listing, name=' movie_Listing'),
    path('view_movie/<int:id>/', views.view_movie, name='view_movie'),
    path('movie_Booking/', views.movie_Booking, name='movie_Booking'),
    path('user_logout/', views.user_logout, name='user_logout'),
    path('generate_order/', views.generate_order, name='generate_order'),
    path('booking_history/<int:user_id>', views.booking_history, name='booking_history'),
    path('send_email', views.send_email, name='send_email'),
    

]
