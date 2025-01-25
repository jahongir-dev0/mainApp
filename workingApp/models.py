from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
import uuid
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User



class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    userPhoto=models.ImageField(upload_to='photo', blank=True, null=True)
    is_admin = models.BooleanField(default=False)
    book_list = models.ManyToManyField('Book', blank=True)

    def str(self):
        return self.user.username




class Book(models.Model):
    BOOK_CATEGORIES = (
        ('FICTION', 'Fiction'),
        ('NON_FICTION', 'Non-fiction'),
        ('SCIENCE', 'Science'),
        ('HISTORY', 'History'),
        ('BIOGRAPHY', 'Biography'),
        ('REKA', 'Reka'),
    )
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    isbn = models.CharField(max_length=13 ,null=True)
    pub_date = models.DateField(null=True)
    image = models.ImageField(upload_to='photo', blank=True, null=True)
    details = models.TextField(null=True, blank=True)
    available = models.BooleanField(default=True)
    category = models.CharField(max_length=100, choices=BOOK_CATEGORIES)
    borrowingDate=models.TimeField(null=True)

    def __str__(self):
        return f"{self.title} by {self.author}"

    def get_absolute_url(self):
        return reverse('book-detail', kwargs={'pk': self.pk})