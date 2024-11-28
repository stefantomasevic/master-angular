import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Pristup Router-u
  const token = localStorage.getItem('token');

  if (token) {
    return true; // Ako postoji token, dozvoli pristup ruti
  }

  router.navigate(['/not-found']); // Ako nema tokena, preusmeri na "Not Found"
  return false;
};

