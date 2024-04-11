--
-- PostgreSQL database dump
--

-- Dumped from database version 13.14 (Debian 13.14-0+deb11u1)
-- Dumped by pg_dump version 13.14 (Debian 13.14-0+deb11u1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: gameboard; Type: TABLE; Schema: public; Owner: kylestech95
--

CREATE TABLE public.gameboard (
    round integer NOT NULL,
    color text[] NOT NULL
);


ALTER TABLE public.gameboard OWNER TO kylestech95;

--
-- Name: gameboard_round_seq; Type: SEQUENCE; Schema: public; Owner: kylestech95
--

CREATE SEQUENCE public.gameboard_round_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gameboard_round_seq OWNER TO kylestech95;

--
-- Name: gameboard_round_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kylestech95
--

ALTER SEQUENCE public.gameboard_round_seq OWNED BY public.gameboard.round;


--
-- Name: gameboard round; Type: DEFAULT; Schema: public; Owner: kylestech95
--

ALTER TABLE ONLY public.gameboard ALTER COLUMN round SET DEFAULT nextval('public.gameboard_round_seq'::regclass);


--
-- Data for Name: gameboard; Type: TABLE DATA; Schema: public; Owner: kylestech95
--

COPY public.gameboard (round, color) FROM stdin;
1	{"{\\"red\\"}"}
2	{"{\\"red\\",\\"red\\"}"}
3	{"{\\"red\\",\\"red\\",\\"yellow\\"}"}
\.


--
-- Name: gameboard_round_seq; Type: SEQUENCE SET; Schema: public; Owner: kylestech95
--

SELECT pg_catalog.setval('public.gameboard_round_seq', 3, true);


--
-- Name: gameboard gameboard_pkey; Type: CONSTRAINT; Schema: public; Owner: kylestech95
--

ALTER TABLE ONLY public.gameboard
    ADD CONSTRAINT gameboard_pkey PRIMARY KEY (round);


--
-- PostgreSQL database dump complete
--

