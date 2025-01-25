from django.urls import path
from . import views
from .views import user_login 
from .views import user_signup  
from .views import ajax_search_books

urlpatterns=[
    path('User_Home/',views.User_Home,name='User_Home'),
    path('template/',views.template,name='template'),
    path('userBookList/',views.userBookList,name='userBookList'),
    path('userBorrowBook/',views.userBorrowBook,name='userBorrowBook'),
    path('userSearchBooks/',views.userSearchBooks,name='userSearchBooks'),
    path('userViewList/',views.userViewList,name='userViewList'),
    path('adminAddBooks/', views.adminAddBooks, name='adminAddBooks'),
    path('adminAddBooks/submit/', views.submit_book, name='submit_book'),    
    path('adminEditBooks/',views.adminEditBooks,name='adminEditBooks'),

    path('adminEditBooks/edit/<int:pk>/', views.edit_book, name='edit_book'),
    path('adminEditBooks/delete/<int:pk>/', views.delete_book, name='delete_book'),

    path('', user_login, name='login'),  # The URL name can remain the same
    path('SignUp/', user_signup, name='signup'),
    path('book/<int:book_id>/', views.template, name='template'),
    path('return-book/', views.return_book, name='return_book'),

    path('ajax/search_books/', ajax_search_books, name='ajax_search_books')


]
