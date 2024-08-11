
from rest_framework import viewsets, status
from .models import Ticket, User
from .serialiers import TicketSerializer, UserSerializer
from django_filters import rest_framework as filters
from rest_framework.response import Response

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    ## This the Get Response
    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        owner_id = self.request.query_params.get('owner')
        user = User.objects.get(id=owner_id)
        status = user.get_ticket_status()
        meta = {
            'count': response.data['count'],
            'page_size': self.paginator.page.paginator.per_page,
            'total_pages': self.paginator.page.paginator.num_pages,
            'current_page': self.paginator.page.number,
            'ticket_status': status
        }
        return Response({
            'data': response.data['results'],
            'meta': meta
        })

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        return Response({'message': 'Ticket created'}, status=status.HTTP_201_CREATED)

