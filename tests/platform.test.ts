import assert from "node:assert/strict";
import test from "node:test";
import {
  canAccess,
  isDuplicateCheckIn,
  isPartnerQrCode,
} from "../lib/authorization.ts";
import { defaultDestination } from "../lib/session.ts";

test("registration destinations preserve the role workflow", () => {
  assert.equal(defaultDestination("Partner"), "/pass");
  assert.equal(defaultDestination("Coordination Team"), "/admin/check-in");
  assert.equal(defaultDestination("Presenter"), "/programme");
});

test("route access follows the current matrix", () => {
  assert.equal(canAccess("/programme", "Partner"), false);
  assert.equal(canAccess("/programme", "Presenter"), true);
  assert.equal(canAccess("/partners", "Partner"), true);
  assert.equal(canAccess("/attendance", "Observer"), false);
  assert.equal(canAccess("/attendance", "Coordination Team"), true);
});

test("QR lookup accepts only the registration ID shape", () => {
  assert.equal(isPartnerQrCode("OAK-2026-AB12-9XYZ"), true);
  assert.equal(isPartnerQrCode("OAK-2026-invalid"), false);
  assert.equal(isPartnerQrCode(null), false);
});

test("duplicate check-in database errors are handled idempotently", () => {
  assert.equal(isDuplicateCheckIn("23505"), true);
  assert.equal(isDuplicateCheckIn("42501"), false);
  assert.equal(isDuplicateCheckIn(null), false);
});
