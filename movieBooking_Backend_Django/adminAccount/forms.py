from django import forms
from .models import Movie
from django import forms

class MovieForm(forms.ModelForm):
    class Meta:
        model = Movie
        fields = ['title', 'genre', 'description', 'image_url', 'time1', 'time2', 'time3','time4','startDate','endDate']