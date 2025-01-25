from django.shortcuts import render, get_object_or_404,redirect
from .models import *
from django.contrib.auth import authenticate, login as auth_login
from django.shortcuts import render, redirect
from django.db.models import Q
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage

from .forms import *

def user_signup(request):
    if request.method == 'POST':
        form = UserSignupForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')  # Adjust the redirect as needed
    else:
        form = UserSignupForm()
    return render(request, 'pages/SignUp.html', {'form': form})


def user_login(request):
    if request.method == 'POST':
        form = LoginForm(request=request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            auth_login(request, user)
            if user.userprofile.is_admin:  # Check if the user is admin
                return redirect('adminEditBooks')  # Redirect to admin home page
            else:
                return redirect('User_Home')  # Redirect to user home page
    else:
        form = LoginForm()
    return render(request, 'pages/login.html', {'form': form})

def User_Home(request):
    context={
        'books': Book.objects.all(),
        'user': request.user
    }
    return render(request, 'pages/User_Home.html',context)


def template(request):
    return render(request, 'pages/template.html')

def userBookList(request):
    user_profile = UserProfile.objects.get(user=request.user)
    books = user_profile.book_list.all()

    context = {
        'books': books,
        'user_profile': user_profile,
        'user': request.user,
    }
    return render(request, 'pages/userBookList.html', context)

def return_book(request):
    if request.method == 'POST':
        book_id = request.POST.get('book_id')
        if book_id:
            book = get_object_or_404(Book, id=book_id)
            user_profile = UserProfile.objects.get(user=request.user)
            if book in user_profile.book_list.all():
                user_profile.book_list.remove(book)
                user_profile.save()
                return redirect('userBookList')
    return redirect('userBookList')

def userBorrowBook(request):
    if request.method == 'POST':
        book_id = request.POST.get('borrow')
        if book_id:
            book = get_object_or_404(Book, id=book_id)
            user_profile = UserProfile.objects.get(user=request.user)
            if book not in user_profile.book_list.all():
                user_profile.book_list.add(book)
                user_profile.save()
                return redirect('userBookList')  
            else:
                context = {
                    'books': Book.objects.all(),
                    'error': 'You have already borrowed this book.'
                }
                return render(request, 'pages/userBorrowBook.html', context)
    else:
        context = {
            'books': Book.objects.all(),
        }
        return render(request, 'pages/userBorrowBook.html', context)

def userSearchBooks(request):
    query = request.GET.get('query', '')
    books = Book.objects.filter(
        Q(title__icontains=query) |
        Q(author__icontains=query) 
    ) if query else Book.objects.all()
    
    context = {
        'books': books,
        'query': query
    }
    return render(request, 'pages/userSearchBooks.html', context)

def ajax_search_books(request):
    query = request.GET.get('query', '')
    books = Book.objects.filter(
        Q(title__icontains=query) |
        Q(author__icontains=query) 
    ) if query else Book.objects.all()

    results = []
    for book in books:
        results.append({
            'id': book.id,
            'title': book.title,
            'author': book.author,
            'details': book.details,
            'image': book.image.url  
        })
    
    return JsonResponse({'books': results})


def template(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    context = {
        'book': book,
    }
    return render(request, 'pages/template.html', context)

def userViewList(request):
    context={
        'books': Book.objects.all(),

    }
    return render(request, 'pages/userViewList.html',context)

# admin function

def adminAddBooks(request):
    return render(request, 'pages/adminAddBooks.html')

def submit_book(request):
    if request.method == 'POST' and request.FILES['book_photo']:
        title = request.POST['title']
        author = request.POST['author']
        isbn = request.POST['isbn']
        pub_date = request.POST['pub_date']
        genre = request.POST['genre']
        description = request.POST['description']
        book_photo = request.FILES['book_photo']

        new_book = Book(
            title=title,
            author=author,
            isbn=isbn,
            pub_date=pub_date,
            category=genre,
            details=description,
            image=book_photo,  
        )
        new_book.save()

        return redirect('adminEditBooks')  # Redirect to the books page after submission
    else:
        return render(request, 'pages/adminAddBooks.html')


def adminEditBooks(request):
    query = request.GET.get('query', '')
    books = Book.objects.filter(
        Q(title__icontains=query) |
        Q(author__icontains=query) 
    ) if query else Book.objects.all()
    
    context = {
        'books': books,
        'query': query
    }
    return render(request, 'pages/adminEditBooks.html',context)


def edit_book(request, pk):
    book = get_object_or_404(Book, pk=pk)
    if request.method == 'POST':
        form = BookForm(request.POST, request.FILES, instance=book)
        if form.is_valid():
            form.save()
            return redirect('adminEditBooks')
    else:
        form = BookForm(instance=book)
    return render(request, 'pages/edit_book.html', {'form': form, 'book': book})

def delete_book(request, pk):
    book = get_object_or_404(Book, pk=pk)
    if request.method == 'POST':
        book.delete()
        return redirect('adminEditBooks')
    return render(request, 'pages/delete_confirm.html', {'book': book})