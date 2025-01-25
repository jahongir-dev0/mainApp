from django import forms
from django.contrib.auth.models import User
from .models import *
from django.contrib.auth.forms import AuthenticationForm


class UserSignupForm(forms.ModelForm):
    username = forms.CharField(max_length=150, required=True)
    email = forms.EmailField(required=True)
    password = forms.CharField(widget=forms.PasswordInput(), required=True)
    confirm_password = forms.CharField(widget=forms.PasswordInput(), required=True)
    is_admin = forms.BooleanField(required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password','is_admin']

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')

        if password and confirm_password and password != confirm_password:
            self.add_error('confirm_password', "Password and confirm password do not match")

        return cleaned_data

    def save(self, commit=True):
        user = super(UserSignupForm, self).save(commit=False)
        user.set_password(self.cleaned_data['password'])
        if commit:
            user.save()
            user_profile, created = UserProfile.objects.get_or_create(user=user)
            user_profile.is_admin = self.cleaned_data.get('is_admin', False)
            user_profile.save()
        return user

class LoginForm(AuthenticationForm):
    username = forms.CharField(
        label="Email Address",
        widget=forms.TextInput(attrs={
            'placeholder': 'Enter your username',
            'style': 'width: 100%; color: white; background: transparent; border: 1px solid white;'
        })
    )
    password = forms.CharField(
        label="Password",
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Enter your password',
            'style': 'width: 100%; color: white; background: transparent; border: 1px solid white;'
        })
    )


class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['title', 'author', 'isbn', 'category', 'details', 'image']


class ReturnBookForm(forms.Form):
    book_id = forms.IntegerField(widget=forms.HiddenInput())