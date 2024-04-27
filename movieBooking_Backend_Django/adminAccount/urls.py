from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
       path('signup/', views.signup, name='signup'),
       path('combined_login/', views.combined_login, name='login'),
       # path('login/', views.rest_login, name='login'),
       path('add_movie/', views.add_movie, name='add_movie'),
       path('update_movie/<int:id>/', views.update_movie, name='update_movie'),
       path('list_movies/', views.list_movies, name='list_movies'),
       path('delete_movie/<int:pk>/', views.delete_movie),
       path('logout/', views.logout_view),
       path('enable_movie/<int:movie_id>/', views.enable_movie, name='enable_movie'),
       path('disable_movie/<int:movie_id>/', views.disable_movie, name='disable_movie'),
      
]