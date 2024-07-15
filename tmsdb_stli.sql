-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."category" (
    "id" int8 NOT NULL,
    "categoryname" text NOT NULL,
    "group_id" int8,
    CONSTRAINT "category_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id"),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."feedbacks" (
    "id" int8 NOT NULL,
    "title" text NOT NULL,
    "description" text NOT NULL,
    "createdby" int8,
    "createdat" timestamptz DEFAULT CURRENT_TIMESTAMP,
    "viewed" bool NOT NULL DEFAULT false,
    "isanon" bool,
    CONSTRAINT "feedbacks_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "public"."users"("id"),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."groups" (
    "id" int8 NOT NULL,
    "groupname" text NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."roles" (
    "id" int8 NOT NULL,
    "rolename" text NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."surveyresponses" (
    "id" int8 NOT NULL,
    "user_id" int8,
    "survey_id" int8,
    "response_data" jsonb NOT NULL,
    "createdat" timestamptz DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "surveyresponses_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "public"."surveys"("id"),
    CONSTRAINT "surveyresponses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id"),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."surveys" (
    "id" int8 NOT NULL,
    "title" text NOT NULL,
    "surveyfields" jsonb NOT NULL,
    "createdby" int8,
    "createdat" timestamptz DEFAULT CURRENT_TIMESTAMP,
    "closes_at" timestamptz NOT NULL,
    "category" int8,
    "survey_img" text,
    CONSTRAINT "fk_category" FOREIGN KEY ("category") REFERENCES "public"."category"("id"),
    CONSTRAINT "surveys_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "public"."users"("id"),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."ticketpriority" (
    "id" int8 NOT NULL,
    "name" text NOT NULL,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX ticketpriority_name_key ON public.ticketpriority USING btree (name);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."tickets" (
    "id" int8 NOT NULL,
    "title" text NOT NULL,
    "description" text NOT NULL,
    "subcategory_id" int8,
    "priority" int8,
    "status" int8,
    "createdby" int8,
    "createdat" timestamptz DEFAULT CURRENT_TIMESTAMP,
    "assignedto" int8,
    "closedby" int8,
    "closedat" timestamptz,
    "notes" varchar(1000),
    CONSTRAINT "tickets_assignedto_fkey" FOREIGN KEY ("assignedto") REFERENCES "public"."users"("id"),
    CONSTRAINT "tickets_closedby_fkey" FOREIGN KEY ("closedby") REFERENCES "public"."users"("id"),
    CONSTRAINT "tickets_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "public"."users"("id"),
    CONSTRAINT "tickets_priority_fkey" FOREIGN KEY ("priority") REFERENCES "public"."ticketpriority"("id"),
    CONSTRAINT "tickets_status_fkey" FOREIGN KEY ("status") REFERENCES "public"."ticketstatus"("id"),
    CONSTRAINT "tickets_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "public"."category"("id"),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."ticketstatus" (
    "id" int8 NOT NULL,
    "name" text NOT NULL,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX ticketstatus_name_key ON public.ticketstatus USING btree (name);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."userrole_mapping" (
    "id" int8 NOT NULL,
    "user_id" int8,
    "role_id" int8,
    "group_id" int8,
    "category_id" int8,
    "can_create_survey" bool DEFAULT false,
    CONSTRAINT "userrole_mapping_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id"),
    CONSTRAINT "userrole_mapping_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id"),
    CONSTRAINT "userrole_mapping_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id"),
    CONSTRAINT "userrole_mapping_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int8 NOT NULL,
    "username" text NOT NULL,
    "email" text NOT NULL,
    "password" text NOT NULL,
    "createdat" timestamptz DEFAULT CURRENT_TIMESTAMP,
    "updatedat" timestamptz DEFAULT CURRENT_TIMESTAMP,
    "isactive" bool DEFAULT true,
    "clerk_id" varchar(255),
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX unique_clerk_id ON public.users USING btree (clerk_id);

INSERT INTO "public"."category" ("id", "categoryname", "group_id") VALUES
(1, 'Client Visit', 1);
INSERT INTO "public"."category" ("id", "categoryname", "group_id") VALUES
(2, 'Admin Grievance', 1);
INSERT INTO "public"."category" ("id", "categoryname", "group_id") VALUES
(3, 'Transportation Request', 1);
INSERT INTO "public"."category" ("id", "categoryname", "group_id") VALUES
(4, 'Printer', 3),
(5, 'Computer Hardware', 3),
(6, 'Software', 3),
(7, 'Leave', 2),
(8, 'Cafeteria', 1),
(9, 'Salary Related', 2),
(10, 'Antivirus', 3),
(11, 'Meeting Room', 1),
(12, 'Attendance', 2);

INSERT INTO "public"."feedbacks" ("id", "title", "description", "createdby", "createdat", "viewed", "isanon") VALUES
(42, 'Test feedback 2', 'Hello', NULL, '2024-05-06 17:32:42.722549+00', 't', 'f');
INSERT INTO "public"."feedbacks" ("id", "title", "description", "createdby", "createdat", "viewed", "isanon") VALUES
(20, 'jfhdighughg[', 'djfbdf''dfurun rn  jeffjewfj]wefj]efj94rf i iefjfejwq]
n', NULL, '2024-04-23 16:18:43.912248+00', 't', 't');
INSERT INTO "public"."feedbacks" ("id", "title", "description", "createdby", "createdat", "viewed", "isanon") VALUES
(7, 'sfdsf', 'sfwer32fscsdc', NULL, '2024-04-20 19:01:10.725117+00', 'f', 't');
INSERT INTO "public"."feedbacks" ("id", "title", "description", "createdby", "createdat", "viewed", "isanon") VALUES
(40, 'siraj', 'siraj is a good boi', NULL, '2024-05-03 10:27:50.056651+00', 't', 't'),
(8, 'sdfdsfdf', 'sdfdsgwf23fcdscsc', NULL, '2024-04-20 19:01:23.771645+00', 'f', 't'),
(24, 'A FeedBack Test', 'Some Test Feedback Checking. ', 24, '2024-04-26 09:20:56.822672+00', 't', 't'),
(39, 'siraj', 'siraj is a good boi', NULL, '2024-05-03 10:27:49.507321+00', 't', 't'),
(38, 'dasfsdf', 'refsdfsfd', NULL, '2024-05-03 10:25:46.10375+00', 't', 't'),
(19, 'djsfoidsfoif', 'odfoudsfnodsf[ofw''fnfi v4r [r rjnfiwnf]qnw ', 1, '2024-04-23 15:52:37.290105+00', 't', 't'),
(41, 'Test feedback', 'today is sunday', NULL, '2024-05-05 08:38:14.950215+00', 't', 't'),
(43, 'test', 'test 123....', NULL, '2024-05-13 11:07:24.200055+00', 't', 't'),
(6, 'ok', 'ok ok ok ok ok', NULL, '2024-04-20 18:57:56.930295+00', 'f', 't'),
(11, 'A feedback', 'The Feedback BODY', NULL, '2024-04-21 05:58:37.489453+00', 'f', 't'),
(3, 'jjjjj', 'joj', 1, '2024-03-20 08:26:27.424797+00', 't', 't'),
(13, 'test', 'A test feedback', 12, '2024-04-21 06:19:27.586178+00', 't', 't'),
(12, 'aaaa', 'aaa', NULL, '2024-04-21 06:05:33.86363+00', 't', 't'),
(10, 'Suggestions for Improvement', 'I have some suggestions for improving the user experience on your platform. There are a few areas where the navigation could be smoother, and some features could be more intuitive. Overall, I believe these changes would greatly enhance the usability of the application.', 12, '2024-04-20 20:59:10.584959+00', 'f', 't'),
(1, 'titok', 'kojink', 1, '2024-04-20 08:26:27.424797+00', 't', 't'),
(4, 'The Food is great', 'The lunch is very good', NULL, '2024-04-20 16:54:31.662623+00', 't', 't'),
(5, 'Test from front end', 'A test from front end feedback body!!', NULL, '2024-04-20 18:55:01.665223+00', 't', 't'),
(14, ' Product Quality', 'The quality of the product received was not up to the mark. There were some manufacturing defects, and the overall build felt flimsy. It would be great if more attention is paid to quality control.', 1, '2024-04-22 05:32:11.598657+00', 'f', 't'),
(15, 'Customer Service Experience', 'I had a frustrating experience with customer service. The representative seemed uninterested and was not able to resolve my issue effectively. Improving training for customer service staff might enhance the overall customer experience.', NULL, '2024-04-22 05:32:38.777849+00', 't', 't'),
(16, 'Dummy', 'Dummy Description', NULL, '2024-04-22 06:59:28.065378+00', 'f', 't'),
(17, 'Dummy', 'A Dummy Feedback', 1, '2024-04-23 15:50:43.935698+00', 'f', 't'),
(18, 'Another Dummy', 'Another Dummy Feedback description', NULL, '2024-04-23 15:51:46.514365+00', 'f', 't'),
(9, 'Great experience with the new feature!', 'I recently tried out the new feature you introduced, and I must say, it''s fantastic! The user interface is intuitive, and the added functionality has greatly improved my workflow. Keep up the good work!', NULL, '2024-04-20 19:40:30.960628+00', 't', 't'),
(21, 'Food', 'Food Is good', 1, '2024-04-24 11:27:36.485051+00', 'f', 't'),
(22, 'So what to do?', 'Tell me what to do...?', 1, '2024-04-26 08:54:08.929766+00', 'f', 't'),
(23, 'A FeedBack Test', 'Some Test Feedback Checking. ', 24, '2024-04-26 09:20:55.942189+00', 'f', 't'),
(25, 'A FeedBack Test', 'Some Test Feedback Checking. ', 24, '2024-04-26 09:20:56.943359+00', 'f', 't'),
(26, 'A FeedBack Test', 'Some Test Feedback Checking. ', 24, '2024-04-26 09:20:57.156603+00', 'f', 't'),
(31, 'dnfonprfbhei[pher', 'owenfurnfiprhfbirwbfir', NULL, '2024-05-03 10:12:41.200255+00', 'f', 't'),
(32, 'fxhdxvkhvk', 'lugluygk', NULL, '2024-05-03 10:17:27.100629+00', 'f', 't'),
(33, 'jjj', 'jjjjj', NULL, '2024-05-03 10:19:39.652453+00', 'f', 't'),
(34, 'sdsdsd', 'sddsdsdsds', NULL, '2024-05-03 10:20:37.460241+00', 'f', 't'),
(35, 'lk', 'pok', NULL, '2024-05-03 10:23:39.202463+00', 'f', 't'),
(36, 'lk', 'pok', NULL, '2024-05-03 10:24:39.521135+00', 'f', 't'),
(37, 'lk2', 'pokgbugv', NULL, '2024-05-03 10:24:49.805571+00', 'f', 't'),
(44, 'test 123', 'test 7890', NULL, '2024-05-14 11:40:42.76061+00', 't', 't'),
(45, 'Lovely Decorations!', 'The new decorations around the office are amazing!', NULL, '2024-05-22 05:02:22.259491+00', 't', 't'),
(46, 'some title', 'some feedback', NULL, '2024-05-24 05:07:55.01875+00', 'f', 't'),
(47, 'some feedback ', 'some feedback ', NULL, '2024-05-24 05:09:04.864798+00', 'f', 't'),
(48, 'title', 'feedback', 14, '2024-05-24 05:21:42.766886+00', 'f', 't'),
(49, 'my new feedback', 'my new feedback', 14, '2024-05-24 05:24:24.388873+00', 'f', 't'),
(50, 'test feedback', 'test feedback', 14, '2024-05-24 05:26:29.670947+00', 'f', 't'),
(53, 'anon feedback', 'anon feedback', 14, '2024-05-24 05:49:10.806175+00', 't', 't'),
(52, 'open feedback', 'open feedback', 14, '2024-05-24 05:48:58.604137+00', 't', 'f'),
(51, 'feedback form created now', 'feedback form created now', 14, '2024-05-24 05:33:15.651264+00', 't', 'f');

INSERT INTO "public"."groups" ("id", "groupname") VALUES
(1, 'Admin');
INSERT INTO "public"."groups" ("id", "groupname") VALUES
(2, 'Human Resource');
INSERT INTO "public"."groups" ("id", "groupname") VALUES
(3, 'Information Technology');

INSERT INTO "public"."roles" ("id", "rolename") VALUES
(1, 'admin');
INSERT INTO "public"."roles" ("id", "rolename") VALUES
(2, 'user');


INSERT INTO "public"."surveyresponses" ("id", "user_id", "survey_id", "response_data", "createdat") VALUES
(49, 25, 70, '"[{\"label\":\"\",\"type\":\"text\",\"answer\":\"Great Experience\",\"id\":\"1\"},{\"label\":\"Which feature is most important to you?\",\"type\":\"select-one\",\"answer\":\"Quality\",\"id\":\"2\"},{\"label\":\"Which feature is most important to you?\",\"type\":\"select-one\",\"answer\":\"Price\",\"id\":\"3\"},{\"label\":\"What features would you like to see added? \",\"type\":\"checkbox\",\"answer\":\"Waterproofing\",\"id\":\"4\"},{\"label\":\"What features would you like to see added? \",\"type\":\"checkbox\",\"answer\":\"Enhanced Battery Life\",\"id\":\"5\"},{\"label\":\"\",\"type\":\"file\",\"answer\":\"upload-icon.png\",\"id\":\"8\"},{\"label\":\"\",\"type\":\"date\",\"answer\":\"2024-05-03\",\"id\":\"9\"},{\"htmlString\":\"<div id=\\\"dom-form\\\" class=\\\"bg-slate-300 pt-4\\\"><form method=\\\"post\\\" class=\\\"flex flex-col justify-center items-center gap-4 mt-12\\\"><div class=\\\"w-[55%] rounded-lg border-t-4 border-blue-500 bg-white p-3 \\\"><div class=\\\"text-2xl text-center flex justify-center items-center\\\"><label class=\\\" block my-8 w-[100%] text-2xl outline-none text-center\\\">New Product Research Survey</label></div><div class=\\\" text-xl text-center flex justify-center items-center\\\"><textarea class=\\\"w-[100%] outline-none\\\" placeholder=\\\"Survey Description\\\">Help us improve our products! Please complete this short survey</textarea></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label for=\\\"1\\\" class=\\\"mb-3 text-lg\\\">Describe your experience with our new product </label><input id=\\\"1\\\" placeholder=\\\"input\\\" name=\\\"TextField\\\"></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label class=\\\"mb-3 text-lg\\\">Which feature is most important to you?</label><select id=\\\"2\\\" name=\\\"DropDown\\\" class=\\\"w-[40%] rounded-md bg-slate-100 px-4 py-4 outline-none\\\"><option class=\\\"p-10\\\">Choose your pick </option><option class=\\\"p-10\\\">Quality</option><option class=\\\"p-10\\\">Price</option><option class=\\\"p-10\\\">Design</option><option class=\\\"p-10\\\">Durability</option></select></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label class=\\\"mb-3 text-lg\\\">Which feature is most important to you?</label><select id=\\\"3\\\" name=\\\"DropDown\\\" class=\\\"w-[40%] rounded-md bg-slate-100 px-4 py-4 outline-none\\\"><option class=\\\"p-10\\\">Choose your pick </option><option class=\\\"p-10\\\">Quality</option><option class=\\\"p-10\\\">Price</option><option class=\\\"p-10\\\">Design</option><option class=\\\"p-10\\\">Durability</option><option class=\\\"p-10\\\">Reputation</option></select></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><p id=\\\"checkbox-label\\\" class=\\\"mb-3 text-lg\\\">What features would you like to see added? </p><div class=\\\"flex flex-col \\\"><div class=\\\"align-center flex gap-4\\\"><input id=\\\"4\\\" type=\\\"checkbox\\\" value=\\\"Waterproofing\\\" name=\\\"What features would you like to see added?\\\"><label>Waterproofing </label></div><div class=\\\"align-center flex gap-4\\\"><input id=\\\"5\\\" type=\\\"checkbox\\\" value=\\\"Enhanced Battery Life\\\" name=\\\"What features would you like to see added?\\\"><label>Enhanced Battery Life </label></div><div class=\\\"align-center flex gap-4\\\"><input id=\\\"6\\\" type=\\\"checkbox\\\" value=\\\"Improved Camera\\\" name=\\\"What features would you like to see added?\\\"><label>Improved Camera </label></div><div class=\\\"align-center flex gap-4\\\"><input id=\\\"7\\\" type=\\\"checkbox\\\" value=\\\"Other\\\" name=\\\"What features would you like to see added?\\\"><label>Other </label></div></div></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label for=\\\"8\\\" class=\\\"mb-3 text-lg\\\">Please upload any images or videos showcasing the product in use</label><div class=\\\"flex justify-center items-center\\\"><input id=\\\"8\\\" class=\\\"w-72 max-w-full p-1.5 bg-white text-gray-800 rounded-lg border border-gray-500 file:mr-5 file:border-none file:bg-blue-800 file:px-5 file:py-2 file:rounded-lg file:text-white file:cursor-pointer file:hover:bg-blue-600\\\" type=\\\"file\\\" name=\\\"myfile\\\"></div></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label for=\\\"9\\\" class=\\\"mb-3 text-lg\\\">When did you last use our product? </label><div class=\\\"relative max-w-sm\\\"><div class=\\\"pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5\\\"><svg class=\\\"h-4 w-4 text-gray-500 dark:text-gray-400\\\" aria-hidden=\\\"true\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" fill=\\\"currentColor\\\" viewBox=\\\"0 0 20 20\\\"><path d=\\\"M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z\\\"></path></svg></div><input class=\\\"block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500\\\" placeholder=\\\"Select date\\\" id=\\\"9\\\" type=\\\"date\\\" name=\\\"Date\\\"></div></div></div><button id=\\\"submit-btn\\\" class=\\\"mb-2 me-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800\\\" type=\\\"submit\\\" disabled=\\\"\\\">Submitting</button></form></div>\"}]"', '2024-05-06 10:43:50.813094+00');
INSERT INTO "public"."surveyresponses" ("id", "user_id", "survey_id", "response_data", "createdat") VALUES
(51, 12, 70, '"[{\"label\":\"\",\"type\":\"text\",\"answer\":\"great\",\"id\":\"1\"},{\"label\":\"Which feature is most important to you?\",\"type\":\"select-one\",\"answer\":\"Price\",\"id\":\"2\"},{\"label\":\"Which feature is most important to you?\",\"type\":\"select-one\",\"answer\":\"Price\",\"id\":\"3\"},{\"label\":\"What features would you like to see added? \",\"type\":\"checkbox\",\"answer\":\"Waterproofing\",\"id\":\"4\"},{\"label\":\"\",\"type\":\"file\",\"answer\":\"470114b8-1066-4a7e-bf14-2c031110ac8e_VENDOR_MANAGEMENT_SYSTEM (1).pdf\",\"id\":\"8\"},{\"label\":\"\",\"type\":\"date\",\"answer\":\"2024-05-16\",\"id\":\"9\"},{\"htmlString\":\"<div id=\\\"dom-form\\\" class=\\\"bg-slate-300 pt-4 font-Roboto\\\"><form method=\\\"post\\\" class=\\\"flex flex-col justify-center items-center gap-4 mt-12\\\"><div class=\\\"w-[55%] rounded-lg border-t-4 border-blue-500 bg-white p-3 \\\"><div class=\\\"text-2xl flex  items-center \\\"><label class=\\\"my-8 text-left text-2xl outline-none border-b\\\">New Product Research Survey</label></div><div class=\\\" text-xl text-center flex justify-center items-center\\\"><textarea class=\\\"w-[100%] outline-none text-sm\\\" placeholder=\\\"Survey Description\\\">Help us improve our products! Please complete this short survey</textarea></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label for=\\\"1\\\" class=\\\"mb-3 text-lg\\\">Describe your experience with our new product </label><input id=\\\"1\\\" placeholder=\\\"Short answer\\\" name=\\\"TextField\\\"></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label class=\\\"mb-3 text-lg\\\">Which feature is most important to you?</label><select id=\\\"2\\\" name=\\\"DropDown\\\" class=\\\"w-[40%] rounded-md bg-slate-100 px-4 py-4 outline-none\\\"><option class=\\\"p-10\\\">Choose your pick </option><option class=\\\"p-10\\\">Quality</option><option class=\\\"p-10\\\">Price</option><option class=\\\"p-10\\\">Design</option><option class=\\\"p-10\\\">Durability</option></select></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label class=\\\"mb-3 text-lg\\\">Which feature is most important to you?</label><select id=\\\"3\\\" name=\\\"DropDown\\\" class=\\\"w-[40%] rounded-md bg-slate-100 px-4 py-4 outline-none\\\"><option class=\\\"p-10\\\">Choose your pick </option><option class=\\\"p-10\\\">Quality</option><option class=\\\"p-10\\\">Price</option><option class=\\\"p-10\\\">Design</option><option class=\\\"p-10\\\">Durability</option><option class=\\\"p-10\\\">Reputation</option></select></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><p id=\\\"checkbox-label\\\" class=\\\"mb-3 text-lg\\\">What features would you like to see added? </p><div class=\\\"flex flex-col \\\"><div class=\\\"align-center flex gap-4\\\"><input id=\\\"4\\\" type=\\\"checkbox\\\" value=\\\"Waterproofing\\\" name=\\\"What features would you like to see added?\\\"><label>Waterproofing </label></div><div class=\\\"align-center flex gap-4\\\"><input id=\\\"5\\\" type=\\\"checkbox\\\" value=\\\"Enhanced Battery Life\\\" name=\\\"What features would you like to see added?\\\"><label>Enhanced Battery Life </label></div><div class=\\\"align-center flex gap-4\\\"><input id=\\\"6\\\" type=\\\"checkbox\\\" value=\\\"Improved Camera\\\" name=\\\"What features would you like to see added?\\\"><label>Improved Camera </label></div><div class=\\\"align-center flex gap-4\\\"><input id=\\\"7\\\" type=\\\"checkbox\\\" value=\\\"Other\\\" name=\\\"What features would you like to see added?\\\"><label>Other </label></div></div></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label for=\\\"8\\\" class=\\\"mb-3 text-lg\\\">Please upload any images or videos showcasing the product in use</label><div class=\\\"flex justify-center items-center\\\"><input id=\\\"8\\\" class=\\\"w-72 max-w-full p-1.5 bg-white text-gray-800 rounded-lg border border-gray-500 file:mr-5 file:border-none file:bg-blue-800 file:px-5 file:py-2 file:rounded-lg file:text-white file:cursor-pointer file:hover:bg-blue-600\\\" type=\\\"file\\\" name=\\\"myfile\\\"></div></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label for=\\\"9\\\" class=\\\"mb-3 text-lg\\\">When did you last use our product? </label><div class=\\\"relative max-w-sm\\\"><div class=\\\"pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5\\\"><svg class=\\\"h-4 w-4 text-gray-500 dark:text-gray-400\\\" aria-hidden=\\\"true\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" fill=\\\"currentColor\\\" viewBox=\\\"0 0 20 20\\\"><path d=\\\"M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z\\\"></path></svg></div><input class=\\\"block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500\\\" placeholder=\\\"Select date\\\" id=\\\"9\\\" type=\\\"date\\\" name=\\\"Date\\\"></div></div></div><button id=\\\"submit-btn\\\" class=\\\"mb-2 me-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800\\\" type=\\\"submit\\\" disabled=\\\"\\\">Submitting</button></form></div>\"}]"', '2024-05-07 17:59:08.392478+00');
INSERT INTO "public"."surveyresponses" ("id", "user_id", "survey_id", "response_data", "createdat") VALUES
(52, 20, 71, '"[{\"label\":\"\",\"type\":\"text\",\"answer\":\"knowledge\",\"id\":\"1\"},{\"label\":\"How would you rate the overall experience?\",\"type\":\"select-one\",\"answer\":\"Excellent\",\"id\":\"2\"},{\"label\":\"Which parts of the workshop did you find most engaging? \",\"type\":\"checkbox\",\"answer\":\"QnA\",\"id\":\"3\"},{\"label\":\"\",\"type\":\"file\",\"answer\":\"archit.pdf\",\"id\":\"5\"},{\"label\":\"\",\"type\":\"date\",\"answer\":\"2024-05-02\",\"id\":\"6\"},{\"htmlString\":\"<div id=\\\"dom-form\\\" class=\\\"bg-slate-300 pt-4 font-Roboto\\\"><form method=\\\"post\\\" class=\\\"flex flex-col justify-center items-center gap-4 mt-12\\\"><div class=\\\"w-[55%] rounded-lg border-t-4 border-blue-500 bg-white p-3 \\\"><div class=\\\"text-2xl flex  items-center \\\"><label class=\\\"my-8 text-left text-2xl outline-none border-b\\\">Workshop Feedback Form</label></div><div class=\\\" text-xl text-center flex justify-center items-center\\\"><textarea class=\\\"w-[100%] outline-none text-sm\\\" placeholder=\\\"Survey Description\\\">We hope you enjoyed the workshop! Please take a moment to share your feedback with us</textarea></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label for=\\\"1\\\" class=\\\"mb-3 text-lg\\\">What was the most valuable takeaway from the workshop? </label><input id=\\\"1\\\" placeholder=\\\"Short answer\\\" name=\\\"TextField\\\"></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label class=\\\"mb-3 text-lg\\\">How would you rate the overall experience?</label><select id=\\\"2\\\" name=\\\"DropDown\\\" class=\\\"w-[40%] rounded-md bg-slate-100 px-4 py-4 outline-none\\\"><option class=\\\"p-10\\\">Choose your pick </option><option class=\\\"p-10\\\">Excellent</option><option class=\\\"p-10\\\">Good</option><option class=\\\"p-10\\\">Fair</option><option class=\\\"p-10\\\">Poor</option></select></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><p id=\\\"checkbox-label\\\" class=\\\"mb-3 text-lg\\\">Which parts of the workshop did you find most engaging? </p><div class=\\\"flex flex-col \\\"><div class=\\\"align-center flex gap-4\\\"><input id=\\\"3\\\" type=\\\"checkbox\\\" value=\\\"QnA\\\" name=\\\"Which parts of the workshop did you find most engaging?\\\"><label>QnA </label></div><div class=\\\"align-center flex gap-4\\\"><input id=\\\"4\\\" type=\\\"checkbox\\\" value=\\\"Guest Speaker\\\" name=\\\"Which parts of the workshop did you find most engaging?\\\"><label>Guest Speaker </label></div></div></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label for=\\\"5\\\" class=\\\"mb-3 text-lg\\\">Please upload any photos you took during the workshop</label><div class=\\\"flex justify-center items-center\\\"><input id=\\\"5\\\" class=\\\"w-72 max-w-full p-1.5 bg-white text-gray-800 rounded-lg border border-gray-500 file:mr-5 file:border-none file:bg-blue-800 file:px-5 file:py-2 file:rounded-lg file:text-white file:cursor-pointer file:hover:bg-blue-600\\\" type=\\\"file\\\" name=\\\"myfile\\\"></div></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label for=\\\"6\\\" class=\\\"mb-3 text-lg\\\">What date did you attend the workshop? </label><div class=\\\"relative max-w-sm\\\"><div class=\\\"pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5\\\"><svg class=\\\"h-4 w-4 text-gray-500 dark:text-gray-400\\\" aria-hidden=\\\"true\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" fill=\\\"currentColor\\\" viewBox=\\\"0 0 20 20\\\"><path d=\\\"M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z\\\"></path></svg></div><input class=\\\"block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500\\\" placeholder=\\\"Select date\\\" id=\\\"6\\\" type=\\\"date\\\" name=\\\"Date\\\"></div></div></div><button id=\\\"submit-btn\\\" class=\\\"mb-2 me-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800\\\" type=\\\"submit\\\" disabled=\\\"\\\">Submitting</button></form></div>\"}]"', '2024-05-08 09:23:36.576413+00');
INSERT INTO "public"."surveyresponses" ("id", "user_id", "survey_id", "response_data", "createdat") VALUES
(50, 9, 70, '"[{\"label\":\"\",\"type\":\"text\",\"answer\":\"Great Experience\",\"id\":\"1\"},{\"label\":\"Which feature is most important to you?\",\"type\":\"select-one\",\"answer\":\"Quality\",\"id\":\"2\"},{\"label\":\"Which feature is most important to you?\",\"type\":\"select-one\",\"answer\":\"Design\",\"id\":\"3\"},{\"label\":\"What features would you like to see added? \",\"type\":\"checkbox\",\"answer\":\"Waterproofing\",\"id\":\"4\"},{\"label\":\"What features would you like to see added? \",\"type\":\"checkbox\",\"answer\":\"Enhanced Battery Life\",\"id\":\"5\"},{\"label\":\"\",\"type\":\"file\",\"answer\":\"upload-icon.png\",\"id\":\"8\"},{\"label\":\"\",\"type\":\"date\",\"answer\":\"2024-05-02\",\"id\":\"9\"},{\"htmlString\":\"<div id=\\\"dom-form\\\" class=\\\"bg-slate-300 pt-4\\\"><form class=\\\"flex flex-col justify-center items-center gap-4 mt-12\\\" method=\\\"post\\\"><div class=\\\"w-[55%] rounded-lg border-t-4 border-blue-500 bg-white p-3 \\\"><div class=\\\"text-2xl flex  items-center \\\"><label class=\\\"my-8 text-left text-2xl outline-none border-b\\\">New Product Research Survey</label></div><div class=\\\" text-xl text-center flex justify-center items-center\\\"><textarea class=\\\"w-[100%] outline-none text-sm\\\" placeholder=\\\"Survey Description\\\">Help us improve our products! Please complete this short survey</textarea></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label for=\\\"1\\\" class=\\\"mb-3 text-lg\\\">Describe your experience with our new product<!-- --> </label><input id=\\\"1\\\" placeholder=\\\"input\\\" name=\\\"TextField\\\"></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label class=\\\"mb-3 text-lg\\\">Which feature is most important to you?</label><select id=\\\"2\\\" name=\\\"DropDown\\\" class=\\\"w-[40%] rounded-md bg-slate-100 px-4 py-4 outline-none\\\"><option class=\\\"p-10\\\">Choose your pick </option><option class=\\\"p-10\\\">Quality</option><option class=\\\"p-10\\\">Price</option><option class=\\\"p-10\\\">Design</option><option class=\\\"p-10\\\">Durability</option></select></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label class=\\\"mb-3 text-lg\\\">Which feature is most important to you?</label><select id=\\\"3\\\" name=\\\"DropDown\\\" class=\\\"w-[40%] rounded-md bg-slate-100 px-4 py-4 outline-none\\\"><option class=\\\"p-10\\\">Choose your pick </option><option class=\\\"p-10\\\">Quality</option><option class=\\\"p-10\\\">Price</option><option class=\\\"p-10\\\">Design</option><option class=\\\"p-10\\\">Durability</option><option class=\\\"p-10\\\">Reputation</option></select></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><p id=\\\"checkbox-label\\\" class=\\\"mb-3 text-lg\\\">What features would you like to see added?<!-- --> </p><div class=\\\"flex flex-col \\\"><div class=\\\"align-center flex gap-4\\\"><input id=\\\"4\\\" type=\\\"checkbox\\\" name=\\\"What features would you like to see added?\\\" value=\\\"Waterproofing\\\"><label>Waterproofing<!-- --> </label></div><div class=\\\"align-center flex gap-4\\\"><input id=\\\"5\\\" type=\\\"checkbox\\\" name=\\\"What features would you like to see added?\\\" value=\\\"Enhanced Battery Life\\\"><label>Enhanced Battery Life<!-- --> </label></div><div class=\\\"align-center flex gap-4\\\"><input id=\\\"6\\\" type=\\\"checkbox\\\" name=\\\"What features would you like to see added?\\\" value=\\\"Improved Camera\\\"><label>Improved Camera<!-- --> </label></div><div class=\\\"align-center flex gap-4\\\"><input id=\\\"7\\\" type=\\\"checkbox\\\" name=\\\"What features would you like to see added?\\\" value=\\\"Other\\\"><label>Other<!-- --> </label></div></div></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label for=\\\"8\\\" class=\\\"mb-3 text-lg\\\">Please upload any images or videos showcasing the product in use</label><div class=\\\"flex justify-center items-center\\\"><input id=\\\"8\\\" type=\\\"file\\\" class=\\\"w-72 max-w-full p-1.5 bg-white text-gray-800 rounded-lg border border-gray-500 file:mr-5 file:border-none file:bg-blue-800 file:px-5 file:py-2 file:rounded-lg file:text-white file:cursor-pointer file:hover:bg-blue-600\\\" name=\\\"myfile\\\"></div></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label for=\\\"9\\\" class=\\\"mb-3 text-lg\\\">When did you last use our product?<!-- --> </label><div class=\\\"relative max-w-sm\\\"><div class=\\\"pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5\\\"><svg class=\\\"h-4 w-4 text-gray-500 dark:text-gray-400\\\" aria-hidden=\\\"true\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" fill=\\\"currentColor\\\" viewBox=\\\"0 0 20 20\\\"><path d=\\\"M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z\\\"></path></svg></div><input type=\\\"date\\\" class=\\\"block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500\\\" placeholder=\\\"Select date\\\" id=\\\"9\\\" name=\\\"Date\\\"></div></div></div><button id=\\\"submit-btn\\\" class=\\\"mb-2 me-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800\\\" type=\\\"submit\\\" disabled=\\\"\\\">Submitting</button></form></div>\"}]"', '2024-05-07 04:44:17.130322+00');
INSERT INTO "public"."surveyresponses" ("id", "user_id", "survey_id", "response_data", "createdat") VALUES
(65, 16, 99, '"[{\"label\":\"What type of Holi party activities do you prefer?\",\"type\":\"select-one\",\"answer\":\"Water Balloon Fight\",\"id\":\"1\"},{\"label\":\"What type of snacks and foods would you like at the party? (Select all that apply) \",\"type\":\"checkbox\",\"answer\":\"Gujiya\",\"id\":\"4\"},{\"label\":\"What type of snacks and foods would you like at the party? (Select all that apply) \",\"type\":\"checkbox\",\"answer\":\"Pani Puri\",\"id\":\"5\"},{\"label\":\"Would you like a themed dress code for the Holi party?\",\"type\":\"select-one\",\"answer\":\"Yes\",\"id\":\"6\"},{\"label\":\"\",\"type\":\"text\",\"answer\":\"Yes\",\"id\":\"7\"},{\"label\":\"\",\"type\":\"file\",\"answer\":\"pexels-anjana-c-169994-674010.jpg\",\"id\":\"8\"},{\"label\":\"\",\"type\":\"date\",\"answer\":\"2024-05-08\",\"id\":\"9\"},{\"htmlString\":\"<div id=\\\"dom-form\\\" class=\\\"bg-slate-300 pt-4 font-Roboto\\\"><form method=\\\"post\\\" class=\\\"flex flex-col justify-center items-center gap-4 mt-12\\\"><div class=\\\"w-[55%] \\\"><img alt=\\\"A Survey Banner yash ... \\\" loading=\\\"lazy\\\" width=\\\"100\\\" height=\\\"100\\\" decoding=\\\"async\\\" data-nimg=\\\"1\\\" class=\\\"w-[100%] h-[15rem] rounded-lg\\\" src=\\\"https://res.cloudinary.com/dyeeocktp/image/upload/v1715711217/bannerIcon_nch5v7-cropped_nhtxye.svg\\\" style=\\\"color: transparent;\\\"></div><div class=\\\"w-[55%] rounded-lg border-t-4 border-blue-500 bg-white p-3 \\\"><div class=\\\"text-2xl flex  items-center \\\"><label class=\\\"my-8 text-left text-2xl outline-none border-b\\\">ExSquared Holi Party</label></div><div class=\\\" text-xl text-center flex justify-center items-center\\\"><textarea class=\\\"w-[100%] outline-none text-sm\\\" placeholder=\\\"Survey Description\\\">Get ready to celebrate the festival of colors in style! We’re planning an exciting Holi party for our ExSq family, and we need your input to make it unforgettable. Whether you love splashing colors, grooving to Bollywood hits, or savoring delicious treats, your preferences and ideas will help us create a fun-filled event that everyone will enjoy</textarea></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label class=\\\"mb-3 text-lg\\\">What type of Holi party activities do you prefer?</label><select id=\\\"1\\\" name=\\\"DropDown\\\" class=\\\"w-[40%] rounded-md bg-slate-100 px-4 py-4 outline-none\\\"><option class=\\\"p-10\\\">Choose your pick </option><option class=\\\"p-10\\\">Traditional Colors Celebration</option><option class=\\\"p-10\\\">Water Balloon Fight</option><option class=\\\"p-10\\\">Organic Colors Only</option><option class=\\\"p-10\\\">Holi Bonfire (Holika Dahan)</option></select></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><p id=\\\"checkbox-label\\\" class=\\\"mb-3 text-lg\\\">What type of snacks and foods would you like at the party? (Select all that apply) </p><div class=\\\"flex flex-col \\\"><div class=\\\"align-center flex gap-4\\\"><input id=\\\"2\\\" type=\\\"checkbox\\\" value=\\\"Samosas\\\" name=\\\"What type of snacks and foods would you like at the party? (Select all that apply)\\\"><label>Samosas </label></div><div class=\\\"align-center flex gap-4\\\"><input id=\\\"3\\\" type=\\\"checkbox\\\" value=\\\"Chaat\\\" name=\\\"What type of snacks and foods would you like at the party? (Select all that apply)\\\"><label>Chaat </label></div><div class=\\\"align-center flex gap-4\\\"><input id=\\\"4\\\" type=\\\"checkbox\\\" value=\\\"Gujiya\\\" name=\\\"What type of snacks and foods would you like at the party? (Select all that apply)\\\"><label>Gujiya </label></div><div class=\\\"align-center flex gap-4\\\"><input id=\\\"5\\\" type=\\\"checkbox\\\" value=\\\"Pani Puri\\\" name=\\\"What type of snacks and foods would you like at the party? (Select all that apply)\\\"><label>Pani Puri </label></div></div></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label class=\\\"mb-3 text-lg\\\">Would you like a themed dress code for the Holi party?</label><select id=\\\"6\\\" name=\\\"DropDown\\\" class=\\\"w-[40%] rounded-md bg-slate-100 px-4 py-4 outline-none\\\"><option class=\\\"p-10\\\">Choose your pick </option><option class=\\\"p-10\\\">Yes</option><option class=\\\"p-10\\\">No</option></select></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label for=\\\"7\\\" class=\\\"mb-3 text-lg\\\">Do you have any additional suggestions for the Holi party? </label><input id=\\\"7\\\" placeholder=\\\"Short answer\\\" name=\\\"TextField\\\"></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label for=\\\"8\\\" class=\\\"mb-3 text-lg\\\">Do you have any documents or images to support your suggestions? </label><div class=\\\"flex justify-center items-center\\\"><input id=\\\"8\\\" class=\\\"w-72 max-w-full p-1.5 bg-white text-gray-800 rounded-lg border border-gray-500 file:mr-5 file:border-none file:bg-blue-800 file:px-5 file:py-2 file:rounded-lg file:text-white file:cursor-pointer file:hover:bg-blue-600\\\" type=\\\"file\\\" name=\\\"myfile\\\"></div></div></div><div class=\\\"w-[55%] rounded-lg border-l-4 border-blue-500 bg-white p-3\\\"><div class=\\\"flex flex-col \\\"><label for=\\\"9\\\" class=\\\"mb-3 text-lg\\\">Preferred date for next party </label><div class=\\\"relative max-w-sm\\\"><div class=\\\"pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5\\\"><svg class=\\\"h-4 w-4 text-gray-500 dark:text-gray-400\\\" aria-hidden=\\\"true\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" fill=\\\"currentColor\\\" viewBox=\\\"0 0 20 20\\\"><path d=\\\"M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z\\\"></path></svg></div><input class=\\\"block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500\\\" placeholder=\\\"Select date\\\" id=\\\"9\\\" type=\\\"date\\\" name=\\\"Date\\\"></div></div></div><button id=\\\"submit-btn\\\" class=\\\"mb-2 me-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800\\\" type=\\\"submit\\\" disabled=\\\"\\\">Submitting</button></form></div>\"}]"', '2024-05-28 17:10:06.358638+00');


INSERT INTO "public"."surveys" ("id", "title", "surveyfields", "createdby", "createdat", "closes_at", "category", "survey_img") VALUES
(83, 'HR Secret Party%!@Get ready for a fantastic party held for our HR Department ', '[{"type": 0, "label": "Enter your name"}, {"type": 1, "label": "Choose your fav food", "options": ["Fruits", "Veggies", "Meat"]}, {"type": 2, "label": "Pick multiple options", "options": ["1", "2", "3"]}, {"type": 5, "label": "Upload your fav pics"}, {"type": 3, "label": "Mark the date"}]', 1, '2024-05-15 06:06:09.344839+00', '2024-05-17 04:30:00+00', 2, NULL);
INSERT INTO "public"."surveys" ("id", "title", "surveyfields", "createdby", "createdat", "closes_at", "category", "survey_img") VALUES
(67, 'Team Satisfaction Survey%!@We''d love to hear your thoughts on our team''s performance. 
Please take a moment to complete this survey', '[{"type": 0, "label": "Please describe your role in the team."}, {"type": 1, "label": "How satisfied are you with the current team dynamic?", "options": ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"]}, {"type": 2, "label": "Please select the aspects of your role you enjoy", "options": ["Collaboration", " Problem-solving", "Creativity", "Independence", "None of the above"]}, {"type": 5, "label": "Please upload any team documents or feedback you would like to share"}, {"type": 3, "label": "What date did you join the team?"}]', 25, '2024-05-06 08:57:33.330581+00', '2024-06-05 18:30:00+00', NULL, 'https://res.cloudinary.com/dyeeocktp/image/upload/v1715711217/bannerIcon_nch5v7-cropped_nhtxye.svg');
INSERT INTO "public"."surveys" ("id", "title", "surveyfields", "createdby", "createdat", "closes_at", "category", "survey_img") VALUES
(68, 'Customer Feedback Survey%!@Your feedback is important to us. Please answer the following questions to help us improve our services.', '[{"type": 0, "label": "What did you like most about our service?"}, {"type": 1, "label": "How would you rate the quality of our products?", "options": ["Excellent", "Good", "Fair", "Poor"]}, {"type": 2, "label": "Which of the following services did you use?", "options": ["Delivery", "Installation", "Customer Support", "In-store Shopping"]}, {"type": 5, "label": "Please upload any photos or receipts related to your experience."}, {"type": 3, "label": "When did you make your last purchase?"}]', 1, '2024-05-06 09:02:11.541116+00', '2024-06-05 18:30:00+00', NULL, 'https://res.cloudinary.com/dyeeocktp/image/upload/v1715711217/bannerIcon_nch5v7-cropped_nhtxye.svg');
INSERT INTO "public"."surveys" ("id", "title", "surveyfields", "createdby", "createdat", "closes_at", "category", "survey_img") VALUES
(69, 'Spring Festival Event Registration%!@Join us for a day of fun and festivities! Register below.', '[{"type": 0, "label": "Enter your full name."}, {"type": 1, "label": "What time would you prefer to attend?", "options": ["Morning", "Afternoon", "Evening"]}, {"type": 2, "label": "How many family members will be attending", "options": ["1", "2", "3", "4"]}, {"type": 5, "label": "Please upload a photo for your ID badge"}, {"type": 3, "label": " Select the date you would like to attend the event"}]', 1, '2024-05-06 09:04:33.227345+00', '2024-06-05 18:30:00+00', NULL, 'https://res.cloudinary.com/dyeeocktp/image/upload/v1715711217/bannerIcon_nch5v7-cropped_nhtxye.svg'),
(70, 'New Product Research Survey%!@Help us improve our products! Please complete this short survey', '[{"type": 0, "label": "Describe your experience with our new product"}, {"type": 1, "label": "Which feature is most important to you?", "options": ["Quality", "Price", "Design", "Durability"]}, {"type": 1, "label": "Which feature is most important to you?", "options": ["Quality", "Price", "Design", "Durability", "Reputation"]}, {"type": 2, "label": "What features would you like to see added?", "options": ["Waterproofing", "Enhanced Battery Life", "Improved Camera", "Other"]}, {"type": 5, "label": "Please upload any images or videos showcasing the product in use"}, {"type": 3, "label": "When did you last use our product?"}]', 1, '2024-04-06 09:06:58.96178+00', '2024-06-05 18:30:00+00', NULL, 'https://res.cloudinary.com/dyeeocktp/image/upload/v1715711217/bannerIcon_nch5v7-cropped_nhtxye.svg'),
(71, 'Workshop Feedback Form%!@We hope you enjoyed the workshop! Please take a moment to share your feedback with us', '[{"type": 0, "label": "What was the most valuable takeaway from the workshop?"}, {"type": 1, "label": "How would you rate the overall experience?", "options": ["Excellent", "Good", "Fair", "Poor"]}, {"type": 2, "label": "Which parts of the workshop did you find most engaging?", "options": ["QnA", "Guest Speaker"]}, {"type": 5, "label": "Please upload any photos you took during the workshop"}, {"type": 3, "label": "What date did you attend the workshop?"}]', 1, '2023-05-08 09:22:23.115932+00', '2024-06-07 18:30:00+00', NULL, 'https://res.cloudinary.com/dyeeocktp/image/upload/v1715711217/bannerIcon_nch5v7-cropped_nhtxye.svg'),
(99, 'ExSquared Holi Party%!@Get ready to celebrate the festival of colors in style! We’re planning an exciting Holi party for our ExSq family, and we need your input to make it unforgettable. Whether you love splashing colors, grooving to Bollywood hits, or savoring delicious treats, your preferences and ideas will help us create a fun-filled event that everyone will enjoy', '[{"type": 1, "label": "What type of Holi party activities do you prefer?", "options": ["Traditional Colors Celebration", "Water Balloon Fight", "Organic Colors Only", "Holi Bonfire (Holika Dahan)"]}, {"type": 2, "label": "What type of snacks and foods would you like at the party? (Select all that apply)", "options": ["Samosas", "Chaat", "Gujiya", "Pani Puri"]}, {"type": 1, "label": "Would you like a themed dress code for the Holi party?", "options": ["Yes", "No"]}, {"type": 0, "label": "Do you have any additional suggestions for the Holi party?"}, {"type": 5, "label": "Do you have any documents or images to support your suggestions? "}, {"type": 3, "label": "Preferred date for next party"}]', 16, '2024-05-28 17:04:01.899935+00', '2024-06-01 16:58:23+00', NULL, 'https://res.cloudinary.com/dyeeocktp/image/upload/v1715711217/bannerIcon_nch5v7-cropped_nhtxye.svg');

INSERT INTO "public"."ticketpriority" ("id", "name") VALUES
(1, 'Low');
INSERT INTO "public"."ticketpriority" ("id", "name") VALUES
(2, 'Medium');
INSERT INTO "public"."ticketpriority" ("id", "name") VALUES
(3, 'High');

INSERT INTO "public"."tickets" ("id", "title", "description", "subcategory_id", "priority", "status", "createdby", "createdat", "assignedto", "closedby", "closedat", "notes") VALUES
(30, 'Salary not credited', 'losjdisa saodada  osdnsand', 9, 2, 4, 1, '2024-05-14 14:59:57.869351+00', 25, NULL, '2024-05-14 15:42:22.672582+00', NULL);
INSERT INTO "public"."tickets" ("id", "title", "description", "subcategory_id", "priority", "status", "createdby", "createdat", "assignedto", "closedby", "closedat", "notes") VALUES
(29, 'lorem text', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 7, 2, 4, 1, '2024-05-14 09:11:55.310809+00', 24, NULL, '2024-05-14 15:51:45.979321+00', NULL);
INSERT INTO "public"."tickets" ("id", "title", "description", "subcategory_id", "priority", "status", "createdby", "createdat", "assignedto", "closedby", "closedat", "notes") VALUES
(20, 'Salary not credited again2', 'Salary not credited!!!!!!!!!!!!!', 1, 2, 4, 1, '2024-05-06 17:09:55.272861+00', 20, NULL, NULL, NULL);
INSERT INTO "public"."tickets" ("id", "title", "description", "subcategory_id", "priority", "status", "createdby", "createdat", "assignedto", "closedby", "closedat", "notes") VALUES
(17, 'lorem text', 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
', 2, 1, 4, 1, '2024-04-26 04:48:17.291263+00', 22, NULL, '2024-05-06 17:12:42.968316+00', NULL),
(22, 'kioplkdjdk', 'sds 9irin oisdjdijefjijdijd', 1, 1, 1, 1, '2024-05-06 10:46:11.849577+00', 25, NULL, NULL, NULL),
(12, 'Salary not credited', 'Salary for the month April not credited yet. ', 9, 1, 1, 12, '2024-04-22 06:28:06.81576+00', 23, NULL, NULL, NULL),
(5, 'some client visit', 'some client is coming to visit us tomorrow. please make required arrangements.', 2, 1, 4, 12, '2024-04-17 11:14:31.749516+00', 20, 1, '2024-04-25 01:48:36.41+00', NULL),
(10, 'sioenr0jrgithgout', 'hhhhhhhhhhhhhhhh', 1, 1, 4, 12, '2024-04-20 20:14:44.976673+00', 12, 1, '2024-04-25 01:49:44.21+00', NULL),
(7, 'sioenr0jrgithgout', 'sioenr0jrgithgout', 1, 1, 4, 12, '2024-04-20 19:59:43.55931+00', 20, 1, '2024-04-25 04:31:04.254+00', NULL),
(21, 'kioplkdjdk', 'sds 9irin oisdjdijefjijdijd', 1, 1, 4, 1, '2024-05-06 10:45:26.818677+00', 25, NULL, '2024-05-07 04:39:39.633546+00', NULL),
(4, 'Another client visit', 'Another client is coming to visit us tomorrow. please make required arrangements.', 1, 2, 4, 1, '2024-04-17 09:26:28.083724+00', 12, 1, '2024-04-25 04:31:34.153+00', NULL),
(6, 'a good title', 'some random description', 6, 2, 4, 1, '2024-04-18 11:29:21.285426+00', 20, 1, '2024-04-22 05:03:30.315+00', NULL),
(19, 'Salary not credited again', 'Salary not credited!!!!!!!!!!!!!', 1, 2, 1, 1, '2024-05-06 10:39:51.217995+00', 25, NULL, NULL, NULL),
(23, 'Completed tickets adding', 'Tickets addition is completed!', 11, 3, 4, 1, '2024-05-06 10:47:55.08155+00', 25, NULL, NULL, NULL),
(11, 'some title', 'some description', 1, 1, 4, 12, '2024-04-22 06:26:09.726132+00', 20, 1, '2024-04-25 15:08:05.949+00', NULL),
(2, 'A client is visiting', 'A client is coming to visit us tomorrow. please make required arrangements.', 1, 2, 1, 1, '2024-04-17 09:13:31.053594+00', NULL, 1, '2024-05-15 04:31:03.419604+00', NULL),
(13, 'Some problem in my computer', 'I am having some problem in computer, please resolve it. thank you.', 5, 1, 4, 12, '2024-04-25 09:18:18.849595+00', 22, 1, '2024-04-25 15:09:56.235+00', NULL),
(8, 'some title', 'some description', 1, 1, 4, 12, '2024-04-20 20:11:46.432434+00', 23, 1, '2024-04-22 04:58:46.034+00', NULL),
(14, 'Mark Attendance', 'Mark Attendance', 12, 1, 1, 1, '2024-04-25 15:18:59.545172+00', 20, NULL, NULL, NULL),
(9, 'title', 'sessedededed', 1, 1, 4, 12, '2024-04-20 20:12:54.709982+00', 1, 1, '2024-04-22 05:11:39.05+00', NULL),
(16, 'Lorem ipsum dolor', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 1, 1, 1, 1, '2024-04-26 02:11:44.235394+00', 20, NULL, NULL, NULL),
(15, 'something wrong', 'Something wrong, don''t know what to do', 6, 1, 1, 1, '2024-04-25 18:51:41.02951+00', 12, NULL, NULL, NULL),
(28, 'lorem text', 'lorem text', 2, 2, 1, 1, '2024-05-14 09:06:11.933468+00', 24, NULL, '2024-05-14 11:17:43.580539+00', NULL),
(26, 'Want to leave for today', 'Want to leave for today', 7, 1, 4, 1, '2024-05-08 07:16:35.249783+00', 20, NULL, '2024-05-14 06:54:22.360029+00', NULL),
(24, 'hello ticket', 'ticket testing 1 2 3...', 2, 1, 4, 1, '2024-05-07 04:42:21.931743+00', 1, NULL, '2024-05-14 07:20:38.473378+00', NULL),
(27, 'lorem text', 'lorem text', 1, 1, 4, 1, '2024-05-14 07:21:51.393547+00', 24, NULL, '2024-05-14 08:26:41.645925+00', NULL),
(31, 'lorem text', 'lorem text lorem text lorem text', 2, 1, 4, 1, '2024-05-15 04:30:01.883782+00', 20, NULL, '2024-05-15 06:58:23.269638+00', NULL),
(18, 'Salary not credited', 'Salary not credited', 1, 2, 5, 1, '2024-05-06 10:35:58.605823+00', 20, NULL, '2024-05-14 08:26:57.422826+00', NULL),
(25, 'Monitor Requested', 'My monitor has malfunctioned, I request to receive a new monitor', 7, 2, 4, 1, '2024-05-07 17:07:22.686562+00', 1, NULL, '2024-05-08 04:16:47.685779+00', NULL),
(34, 'lorem text', 'lorem text lorem text lorem text lorem text lorem text lorem text', 1, 1, 4, 14, '2024-05-24 04:16:07.251123+00', 14, NULL, '2024-05-24 04:23:55.744458+00', NULL),
(32, 'lorem text', 'lorem text lorem text lorem text lorem text lorem text lorem text lorem text', 7, 1, 5, 1, '2024-05-21 11:15:58.42977+00', 20, NULL, '2024-05-21 11:16:54.357433+00', NULL),
(37, 'Attendance not marked', 'Attendance not marked', 12, 1, 1, 14, '2024-05-28 04:59:58.60286+00', 20, NULL, NULL, NULL),
(33, 'lorem text', 'some description', 1, 1, 1, 1, '2024-05-24 03:41:08.002295+00', 20, NULL, NULL, NULL),
(35, 'Meeting room is always occupied ', 'Meeting room is always occupied ', 11, 1, 5, 14, '2024-05-24 04:28:37.652042+00', 14, NULL, '2024-05-24 04:28:58.110216+00', NULL),
(36, 'lorem text', 'lorem text', 1, 1, 1, 14, '2024-05-28 04:59:19.376973+00', 14, NULL, NULL, NULL),
(38, 'leaving this place', 'leave', 7, 3, 4, 26, '2024-05-29 08:14:18.91425+00', 26, NULL, '2024-05-29 08:15:06.791478+00', NULL),
(39, 'Salary not credited', 'Salary has not been credited. ', 9, 3, 1, 30, '2024-05-31 05:56:20.196581+00', NULL, NULL, NULL, NULL),
(40, 'Rggg', 'Chhjig', 9, 3, 1, 34, '2024-07-04 20:20:45.550433+00', NULL, NULL, NULL, NULL);

INSERT INTO "public"."ticketstatus" ("id", "name") VALUES
(1, 'Open');
INSERT INTO "public"."ticketstatus" ("id", "name") VALUES
(4, 'Resolved');
INSERT INTO "public"."ticketstatus" ("id", "name") VALUES
(5, 'Addressing');

INSERT INTO "public"."userrole_mapping" ("id", "user_id", "role_id", "group_id", "category_id", "can_create_survey") VALUES
(12, 23, 2, 2, 9, 't');
INSERT INTO "public"."userrole_mapping" ("id", "user_id", "role_id", "group_id", "category_id", "can_create_survey") VALUES
(1, 1, 1, 3, 5, 't');
INSERT INTO "public"."userrole_mapping" ("id", "user_id", "role_id", "group_id", "category_id", "can_create_survey") VALUES
(13, 24, 1, 2, 9, 't');
INSERT INTO "public"."userrole_mapping" ("id", "user_id", "role_id", "group_id", "category_id", "can_create_survey") VALUES
(11, 15, 1, 1, 9, 't'),
(2, 6, 2, 2, 9, 't'),
(9, 20, 1, 1, 9, 't');

INSERT INTO "public"."users" ("id", "username", "email", "password", "createdat", "updatedat", "isactive", "clerk_id") VALUES
(1, 'Borer', 'admin@gmail.com', '$2b$10$QqEdjY6/R4/Kx33jfuKnIeo8GdR8yG4I.rVs745UL.sClDDJX5.X2', '2024-04-17 04:30:25.674304+00', '2024-04-17 04:30:25.674304+00', 't', NULL);
INSERT INTO "public"."users" ("id", "username", "email", "password", "createdat", "updatedat", "isactive", "clerk_id") VALUES
(12, 'Jerde', 'user@gmail.com', '$2b$10$NAQtw6FaQhKfqs.9j13xtuQuVR0B8mY1QagGfGFb96N/kiE6vPyO6', '2024-04-17 05:30:49.053606+00', '2024-04-17 05:30:49.053606+00', 't', NULL);
INSERT INTO "public"."users" ("id", "username", "email", "password", "createdat", "updatedat", "isactive", "clerk_id") VALUES
(20, 'Dheeraj', 'dhgupta@ex2india.com', '$2b$10$zJGfFH0A.TgXMjMpUvksAuuDrsM5G/mWJeRUVUegZky9AtHTIOvjG', '2024-04-18 08:53:25.891169+00', '2024-04-18 08:53:25.891169+00', 't', NULL);
INSERT INTO "public"."users" ("id", "username", "email", "password", "createdat", "updatedat", "isactive", "clerk_id") VALUES
(22, 'Rithvik', 'testmail@ex2india.com', '$2b$10$2Pr/HaPLQSvtZeJjMi7/mujlVakF06b.hsxkkoNxYlc1raxCxEIhK', '2024-04-20 17:15:05.159184+00', '2024-04-20 17:15:05.159184+00', 't', NULL),
(18, 'Archit Gupta', 'ag213@snu.edu.in', 'google', '2024-05-29 04:15:51.298896+00', '2024-05-29 04:15:51.298896+00', 't', '102191791701586529743'),
(19, 'Archit Gupta', 'argupta@ex2india.com', 'google', '2024-05-29 04:16:48.657572+00', '2024-05-29 04:16:48.657572+00', 't', '105344921824479982643'),
(21, 'Molleti Surya Pradeep', 'mspradeep@ex2india.com', 'google', '2024-05-29 08:10:08.591805+00', '2024-05-29 08:10:08.591805+00', 't', '100400493922424924330'),
(23, 'Rithvik', 'srreddy@ex2india.com', '$2b$10$T9UWiQcuestR.Ce3MInuR.TNdv9h7nFaciN5T6hiRDo2GqvQI1LAu', '2024-04-20 18:16:22.813978+00', '2024-04-20 18:16:22.813978+00', 't', NULL),
(25, 'Yash', 'yaggarwal@ex2india.com', 'hrsquared', '2024-05-05 11:47:33.772684+00', '2024-05-05 11:47:33.772684+00', 't', NULL),
(24, 'Mahamad Siraj Cheruvu', 'mscheruvu@ex2india.com', 'siraj@123', '2024-04-26 09:18:54.539041+00', '2024-04-26 09:18:54.539041+00', 't', NULL),
(324432343, 'User123', 'user@tmsss', 'hash', '2024-05-14 15:52:46.406374+00', '2024-05-14 15:52:46.406374+00', 't', NULL),
(4, 'clerkTest', 'clerkTest@123', 'clerk', '2024-05-14 16:28:23.017896+00', '2024-05-14 16:28:23.017896+00', 't', '12323rfcfdf'),
(6, 'Yash Aggarwal', 'yashyashaggarwal@gmail.com', 'clerk', '2024-05-14 17:30:11.594915+00', '2024-05-14 17:30:11.594915+00', 't', 'user_2gSkdRF7cy8madMS1PVF3UCyCsP'),
(9, 'yash aggarwal', 'yashaggarwaldemo@gmail.com', 'clerk', '2024-05-14 17:38:19.743702+00', '2024-05-14 17:38:19.743702+00', 't', 'user_2gSopfEa96K52vIPDRGXaab3IYC'),
(10, 'Yash  Aggarwal', 'yaggarwal@ex2india.com', 'clerk', '2024-05-15 04:21:09.892185+00', '2024-05-15 04:21:09.892185+00', 't', 'user_2gAiVTeNd7Y3gxSLI1C5JPjtEH3'),
(11, 'Mahammad Siraj  Cheruvu', 'mscheruvu@ex2india.com', 'clerk', '2024-05-15 05:39:21.54125+00', '2024-05-15 05:39:21.54125+00', 't', 'user_2gB20vw2StZb47EWltltSrDK2ZZ'),
(13, 'VMS VMS', 'vmstest36@gmail.com', 'clerk', '2024-05-21 14:36:28.72403+00', '2024-05-21 14:36:28.72403+00', 't', 'user_2gmUDV7BlGuNFmGWnaqhVuy2lxJ'),
(14, 'Dheeraj Gupta', 'dhgupta@ex2india.com', 'clerk', '2024-05-24 03:28:03.858569+00', '2024-05-24 03:28:03.858569+00', 't', 'user_2gte7BBRxmaQj41yniBsSNLQjFP'),
(15, 'Yash Aggarwal', 'yashyashaggarwal@gmail.com', 'google', '2024-05-28 13:36:18.213499+00', '2024-05-28 13:36:18.213499+00', 't', '115092327438146919815'),
(16, 'Yash Aggarwal', 'yaggarwal@ex2india.com', 'google', '2024-05-28 14:35:20.825454+00', '2024-05-28 14:35:20.825454+00', 't', '100987895795632421716'),
(17, 'yash aggarwal', 'yashaggarwaldemo@gmail.com', 'google', '2024-05-28 17:11:58.377875+00', '2024-05-28 17:11:58.377875+00', 't', '114640180348157062467'),
(26, 'Dheeraj Gupta', 'dhgupta@ex2india.com', 'google', '2024-05-29 08:11:33.722631+00', '2024-05-29 08:11:33.722631+00', 't', '106593412871673592001'),
(27, 'gunjeet singh', 'gunjeet.singh9971@gmail.com', 'google', '2024-05-29 08:22:36.624858+00', '2024-05-29 08:22:36.624858+00', 't', '118193204238250712718'),
(28, 'Sahil Ahmad', 'sahil.ahmedfbd@gmail.com', 'google', '2024-05-29 08:28:47.213557+00', '2024-05-29 08:28:47.213557+00', 't', '105583128752969289563'),
(29, 'Umang Khanna', 'ukhanna@ex2india.com', 'google', '2024-05-29 10:07:30.51867+00', '2024-05-29 10:07:30.51867+00', 't', '113784113982606817768'),
(30, 'MAHAMMAD SIRAJ CHERUVU', 'cmdsiraj2003@gmail.com', 'google', '2024-05-31 05:55:36.315569+00', '2024-05-31 05:55:36.315569+00', 't', '109343303743408516866'),
(31, 'Molleti Surya  Pradeep', 'mspradeep@ex2india.com', 'clerk', '2024-06-05 13:53:05.529715+00', '2024-06-05 13:53:05.529715+00', 't', 'user_2hSlsmsRdIsUXFUvzaniYsSTP6Q'),
(32, 'My Ms', 'myms2288@gmail.com', 'google', '2024-06-13 17:41:20.42359+00', '2024-06-13 17:41:20.42359+00', 't', '116395557311152671674'),
(33, 'Dheeraj Gupta', 'dj13042002@gmail.com', 'google', '2024-06-24 04:04:15.249152+00', '2024-06-24 04:04:15.249152+00', 't', '113297201265269696722'),
(34, 'sayansingha mahapatra', 'msayansingha@gmail.com', 'google', '2024-07-04 20:20:23.742576+00', '2024-07-04 20:20:23.742576+00', 't', '107415308111261349299');
