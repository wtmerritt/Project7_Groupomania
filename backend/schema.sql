-- Table: public.Blogs

-- DROP TABLE IF EXISTS public."Blogs";

CREATE TABLE IF NOT EXISTS public."Blogs"
(
    id integer NOT NULL DEFAULT nextval('"Blogs_id_seq"'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    body character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    "mediaUrl" character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer,
    CONSTRAINT "Blogs_pkey" PRIMARY KEY (id),
    CONSTRAINT "Blogs_UserId_fkey" FOREIGN KEY ("UserId")
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Blogs"
    OWNER to postgres;


   -- Table: public.Users

-- DROP TABLE IF EXISTS public."Users";

CREATE TABLE IF NOT EXISTS public."Users"
(
    id integer NOT NULL DEFAULT nextval('"Users_id_seq"'::regclass),
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "fullName" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY (id),
    CONSTRAINT "Users_email_key" UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Users"
    OWNER to postgres; 