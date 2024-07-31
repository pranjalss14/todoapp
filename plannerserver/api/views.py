from django.shortcuts import render
from rest_framework import generics
from .models import Ticket
from .serialiers import TicketSerializer

# Create your views here.
class TicketView(generics.ListAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer