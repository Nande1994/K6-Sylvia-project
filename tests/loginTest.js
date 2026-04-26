import { TEST_CONFIG } from '../configs/constants.js';
import { PAYLOADS } from '../data/payloads.js';

import {
  loginRequest,
  getProfileRequest,
  postTestimonialRequest,
  updateTestimonialRequest,
  deleteTestimonialRequest
} from '../requests/authRequest.js';

import { check } from 'k6';

export const options = TEST_CONFIG;

export default function () {
  const loginResponse = loginRequest(PAYLOADS.login);

  check(loginResponse, {
    'login status is 200': (r) => r.status === 200,
  });

  const token = JSON.parse(loginResponse.body).data.token;

  const profileResponse = getProfileRequest(token);

  check(profileResponse, {
    'profile status is 200': (r) => r.status === 200,
  });

  const testimonialResponse = postTestimonialRequest(
    token,
    PAYLOADS.testimonial
  );

  check(testimonialResponse, {
    'testimonial created': (r) => r.status === 200 || r.status === 201,
  });
  const testimonialBody = JSON.parse(testimonialResponse.body);
const testimonialId = testimonialBody.data.id;

const updateResponse = updateTestimonialRequest(
  token,
  testimonialId,
  PAYLOADS.updateTestimonial
);

check(updateResponse, {
  'testimonial updated': (r) => r.status === 200,
});

const deleteResponse = deleteTestimonialRequest(token, testimonialId);

check(deleteResponse, {
  'testimonial deleted': (r) =>
    r.status === 200 || r.status === 204,
});
}