CREATE TABLE "printer" (
  "id" int PRIMARY KEY,
  "brand" nvarchar,
  "manufacturer" nvarchar,
  "model" nvarchar,
  "description" nvarchar,
  "buildingName" nvarchar,
  "roomNumber" nvarchar
);

CREATE TABLE "document" (
  "studentID" int,
  "document_id" int,
  "fileName" nvarchar,
  "start_print" nvarchar,
  "end_print" nvarchar,
  "pages" int
);

CREATE TABLE "user" (
  "id" int PRIMARY KEY,
  "username" nvarchar,
  "password" nvarchar,
  "name" nvarchar,
  "class" nvarchar,
  "phoneNumber" nvarchar,
  "balance" nvarchar,
  "role" nvarchar,
  "createdAt" date,
  "updatedAt" date
);

CREATE TABLE "role" (
  "id" int PRIMARY KEY,
  "name" nvarchar
);

CREATE TABLE "tracking_print" (
  "id" int PRIMARY KEY,
  "printer_id" int,
  "user_id" int,
  "document_id" int,
  "type" nvarchar,
  "content" nvarchar,
  "pages" int,
  "paper_type" varchar,
  "copies" integer,
  "time_started" timestamp,
  "time_end" timestamp
);

ALTER TABLE "document" ADD FOREIGN KEY ("studentID") REFERENCES "user" ("id");

ALTER TABLE "role" ADD FOREIGN KEY ("id") REFERENCES "user" ("id");

ALTER TABLE "tracking_print" ADD FOREIGN KEY ("printer_id") REFERENCES "printer" ("id");

ALTER TABLE "tracking_print" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "tracking_print" ADD FOREIGN KEY ("document_id") REFERENCES "document" ("document_id");
