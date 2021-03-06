from django.shortcuts import render
from rest_framework.decorators import permission_classes
from .models import Lead
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer

# Create Lead ViewSet.


class LeadViewSet(viewsets.ModelViewSet):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = LeadSerializer

    def get_queryset(self):
        return self.request.user.leads.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
