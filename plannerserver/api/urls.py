from django.urls import path
from .views import TicketView

urlpatterns = [
    path ("get_tickets", TicketView.as_view(), name="ticket"),
]
