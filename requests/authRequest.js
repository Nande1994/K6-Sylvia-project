import http from 'k6/http';
import { URLS } from '../configs/urls.js';

export function loginRequest(payload) {
  return http.post(URLS.login, JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export function getProfileRequest(token) {
  return http.get(URLS.profile, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function postTestimonialRequest(token, payload) {
  return http.post(URLS.testimonial, JSON.stringify(payload), {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}
export function updateTestimonialRequest(token, testimonialId, payload) {
  return http.put(`${URLS.testimonial}/${testimonialId}`, JSON.stringify(payload), {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}
export function deleteTestimonialRequest(token, testimonialId) {
  return http.del(`${URLS.testimonial}/${testimonialId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}