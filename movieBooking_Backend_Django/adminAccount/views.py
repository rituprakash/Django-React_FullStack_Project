
# Create your views here.

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes 
from rest_framework.response import Response
from django.contrib.auth.forms import UserCreationForm
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate 
from django.views.decorators.csrf import csrf_exempt
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST,HTTP_401_UNAUTHORIZED
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from .forms import MovieForm 
from .models import Movie
from .serializers import MovieSerializer
from django.shortcuts import get_object_or_404
from django.contrib.auth import logout
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from userAccount.forms import CustomUserCreationForm 



#Admin SIGNUP

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    user_type = request.data.get("user_type")
    if user_type == 'admin':
        # Admin signup logic without serializer
        form = UserCreationForm(data=request.data)
    else:
        # Regular user signup logic with serializer
        serializer = CustomUserCreationForm(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Account created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if form.is_valid():
        user = form.save()
        return Response({"message": "Account created successfully"}, status=status.HTTP_201_CREATED)
    return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)



# #Admin LOGIN
# Combined login endpoint
@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def combined_login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    # Check if it's an admin login
    if username == 'admin@gmail.com' and password == 'django@123':
        user = authenticate(username=username, password=password)
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'user_type': 'admin', 'token': token.key}, status=HTTP_200_OK)
        else:
            return Response({'error': 'Invalid Admin Credentials'}, status=HTTP_404_NOT_FOUND)
    # Check if it's a regular user login
    else:
        user = authenticate(username=username, password=password)
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'user_type': 'user', 'token': token.key, 'email':user.email, 'userId': user.id,}, status=HTTP_200_OK)
        else:
            return Response({'error': 'Invalid User Credentials'}, status=HTTP_404_NOT_FOUND)




#Admin ADD SHOW
@api_view(['POST'])
@permission_classes([AllowAny])  
def add_movie(request):
    print(request.data)  
    form = MovieForm(request.data)
    if form.is_valid():
        print("scene1")
        movie = form.save()
        return Response({'id': movie.id}, status=status.HTTP_201_CREATED)
    return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)


#Admin EDIT SHOW
@api_view(['PUT'])
@permission_classes([AllowAny])
def update_movie(request, id):
    movie = get_object_or_404(Movie, pk=id)
    form = MovieForm(request.data, instance=movie)
    if form.is_valid():
        form.save()
        serializer = MovieSerializer(movie)
        return Response(serializer.data)
    else:
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
    

#Admin LIST SHOWS

@api_view(['GET'])
@permission_classes([AllowAny])
def list_movies(request):
    movies = Movie.objects.all()  
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)



#Admin DELETE SHOW
@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_movie(request, pk):
    try:
        movie = Movie.objects.get(pk=pk)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    movie.delete()
    return Response("Show deleted successfully")


#Admin LOGOUT
@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Admin logged out successfully'})



#ENABLE/DISABLE Show
@api_view(['POST'])
@permission_classes([AllowAny])  
@require_POST
def enable_movie(request, movie_id):
    try:
        movie = Movie.objects.get(pk=movie_id)
        movie.is_enabled = True
        movie.save()
        return JsonResponse({'message': 'Movie enabled successfully'})
    except Movie.DoesNotExist:
        return JsonResponse({'error': 'Movie not found'}, status=404)

@api_view(['POST'])
@permission_classes([AllowAny]) 
@require_POST
def disable_movie(request, movie_id):
    try:
        movie = Movie.objects.get(pk=movie_id)
        movie.is_enabled = False
        movie.save()
        return JsonResponse({'message': 'Movie disabled successfully'})
    except Movie.DoesNotExist:
        return JsonResponse({'error': 'Movie not found'}, status=404)
