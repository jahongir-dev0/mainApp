from django.contrib import admin
from .models import *

admin.site.register(Book)


# Option 2: Customize the admin interface
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'is_admin')  # Customize what fields to display
    search_fields = ('user__username',)  # Enable search by username

admin.site.register(UserProfile, UserProfileAdmin)