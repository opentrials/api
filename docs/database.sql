--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.5
-- Dumped by pg_dump version 9.4.5
-- Started on 2016-02-16 09:57:53 MSK

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 190 (class 3079 OID 12723)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 3084 (class 0 OID 0)
-- Dependencies: 190
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- TOC entry 566 (class 1247 OID 24064)
-- Name: intervention_type; Type: TYPE; Schema: public; Owner: opentrials
--

CREATE TYPE intervention_type AS ENUM (
    'drug',
    'other'
);


ALTER TYPE intervention_type OWNER TO opentrials;

--
-- TOC entry 572 (class 1247 OID 24074)
-- Name: location_type; Type: TYPE; Schema: public; Owner: opentrials
--

CREATE TYPE location_type AS ENUM (
    'country',
    'city',
    'other'
);


ALTER TYPE location_type OWNER TO opentrials;

--
-- TOC entry 578 (class 1247 OID 24088)
-- Name: organisation_type; Type: TYPE; Schema: public; Owner: opentrials
--

CREATE TYPE organisation_type AS ENUM (
    'other'
);


ALTER TYPE organisation_type OWNER TO opentrials;

--
-- TOC entry 584 (class 1247 OID 24102)
-- Name: person_type; Type: TYPE; Schema: public; Owner: opentrials
--

CREATE TYPE person_type AS ENUM (
    'other'
);


ALTER TYPE person_type OWNER TO opentrials;

--
-- TOC entry 560 (class 1247 OID 24054)
-- Name: problem_type; Type: TYPE; Schema: public; Owner: opentrials
--

CREATE TYPE problem_type AS ENUM (
    'condition',
    'other'
);


ALTER TYPE problem_type OWNER TO opentrials;

--
-- TOC entry 551 (class 1247 OID 24042)
-- Name: publication_type; Type: TYPE; Schema: public; Owner: opentrials
--

CREATE TYPE publication_type AS ENUM (
    'other'
);


ALTER TYPE publication_type OWNER TO opentrials;

--
-- TOC entry 545 (class 1247 OID 24028)
-- Name: record_type; Type: TYPE; Schema: public; Owner: opentrials
--

CREATE TYPE record_type AS ENUM (
    'trial',
    'other'
);


ALTER TYPE record_type OWNER TO opentrials;

--
-- TOC entry 542 (class 1247 OID 24022)
-- Name: source_type; Type: TYPE; Schema: public; Owner: opentrials
--

CREATE TYPE source_type AS ENUM (
    'register',
    'other'
);


ALTER TYPE source_type OWNER TO opentrials;

--
-- TOC entry 557 (class 1247 OID 24050)
-- Name: trial_document_role; Type: TYPE; Schema: public; Owner: opentrials
--

CREATE TYPE trial_document_role AS ENUM (
    'other'
);


ALTER TYPE trial_document_role OWNER TO opentrials;

--
-- TOC entry 569 (class 1247 OID 24070)
-- Name: trial_intervention_role; Type: TYPE; Schema: public; Owner: opentrials
--

CREATE TYPE trial_intervention_role AS ENUM (
    'other'
);


ALTER TYPE trial_intervention_role OWNER TO opentrials;

--
-- TOC entry 575 (class 1247 OID 24082)
-- Name: trial_location_role; Type: TYPE; Schema: public; Owner: opentrials
--

CREATE TYPE trial_location_role AS ENUM (
    'recruitment_countries',
    'other'
);


ALTER TYPE trial_location_role OWNER TO opentrials;

--
-- TOC entry 581 (class 1247 OID 24092)
-- Name: trial_organisation_role; Type: TYPE; Schema: public; Owner: opentrials
--

CREATE TYPE trial_organisation_role AS ENUM (
    'primary_sponsor',
    'sponsor',
    'funder',
    'other'
);


ALTER TYPE trial_organisation_role OWNER TO opentrials;

--
-- TOC entry 587 (class 1247 OID 24106)
-- Name: trial_person_role; Type: TYPE; Schema: public; Owner: opentrials
--

CREATE TYPE trial_person_role AS ENUM (
    'principal_investigator',
    'public_queries',
    'scientific_queries',
    'other'
);


ALTER TYPE trial_person_role OWNER TO opentrials;

--
-- TOC entry 563 (class 1247 OID 24060)
-- Name: trial_problem_role; Type: TYPE; Schema: public; Owner: opentrials
--

CREATE TYPE trial_problem_role AS ENUM (
    'other'
);


ALTER TYPE trial_problem_role OWNER TO opentrials;

--
-- TOC entry 554 (class 1247 OID 24046)
-- Name: trial_publication_role; Type: TYPE; Schema: public; Owner: opentrials
--

CREATE TYPE trial_publication_role AS ENUM (
    'other'
);


ALTER TYPE trial_publication_role OWNER TO opentrials;

--
-- TOC entry 548 (class 1247 OID 24034)
-- Name: trial_record_role; Type: TYPE; Schema: public; Owner: opentrials
--

CREATE TYPE trial_record_role AS ENUM (
    'primary',
    'secondary',
    'other'
);


ALTER TYPE trial_record_role OWNER TO opentrials;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 183 (class 1259 OID 24249)
-- Name: document; Type: TABLE; Schema: public; Owner: opentrials; Tablespace: 
--

CREATE TABLE document (
    uuid text NOT NULL,
    source_uuid text NOT NULL,
    name text NOT NULL,
    type publication_type,
    data jsonb NOT NULL
);


ALTER TABLE document OWNER TO opentrials;

--
-- TOC entry 172 (class 1259 OID 24115)
-- Name: intervention; Type: TABLE; Schema: public; Owner: opentrials; Tablespace: 
--

CREATE TABLE intervention (
    uuid text NOT NULL,
    name text NOT NULL,
    type intervention_type,
    data jsonb NOT NULL
);


ALTER TABLE intervention OWNER TO opentrials;

--
-- TOC entry 177 (class 1259 OID 24165)
-- Name: location; Type: TABLE; Schema: public; Owner: opentrials; Tablespace: 
--

CREATE TABLE location (
    uuid text NOT NULL,
    name text NOT NULL,
    type location_type,
    data jsonb NOT NULL
);


ALTER TABLE location OWNER TO opentrials;

--
-- TOC entry 178 (class 1259 OID 24175)
-- Name: organisation; Type: TABLE; Schema: public; Owner: opentrials; Tablespace: 
--

CREATE TABLE organisation (
    uuid text NOT NULL,
    name text NOT NULL,
    type organisation_type,
    data jsonb NOT NULL
);


ALTER TABLE organisation OWNER TO opentrials;

--
-- TOC entry 173 (class 1259 OID 24125)
-- Name: person; Type: TABLE; Schema: public; Owner: opentrials; Tablespace: 
--

CREATE TABLE person (
    uuid text NOT NULL,
    name text NOT NULL,
    type person_type,
    data jsonb NOT NULL
);


ALTER TABLE person OWNER TO opentrials;

--
-- TOC entry 176 (class 1259 OID 24155)
-- Name: problem; Type: TABLE; Schema: public; Owner: opentrials; Tablespace: 
--

CREATE TABLE problem (
    uuid text NOT NULL,
    name text NOT NULL,
    type problem_type,
    data jsonb NOT NULL
);


ALTER TABLE problem OWNER TO opentrials;

--
-- TOC entry 179 (class 1259 OID 24185)
-- Name: publication; Type: TABLE; Schema: public; Owner: opentrials; Tablespace: 
--

CREATE TABLE publication (
    uuid text NOT NULL,
    source_uuid text NOT NULL,
    name text NOT NULL,
    type publication_type,
    data jsonb NOT NULL
);


ALTER TABLE publication OWNER TO opentrials;

--
-- TOC entry 182 (class 1259 OID 24236)
-- Name: record; Type: TABLE; Schema: public; Owner: opentrials; Tablespace: 
--

CREATE TABLE record (
    uuid text NOT NULL,
    source_uuid text NOT NULL,
    type record_type,
    data jsonb NOT NULL
);


ALTER TABLE record OWNER TO opentrials;

--
-- TOC entry 175 (class 1259 OID 24145)
-- Name: source; Type: TABLE; Schema: public; Owner: opentrials; Tablespace: 
--

CREATE TABLE source (
    uuid text NOT NULL,
    name text NOT NULL,
    type source_type,
    data jsonb NOT NULL
);


ALTER TABLE source OWNER TO opentrials;

--
-- TOC entry 174 (class 1259 OID 24135)
-- Name: trial; Type: TABLE; Schema: public; Owner: opentrials; Tablespace: 
--

CREATE TABLE trial (
    uuid text NOT NULL,
    primary_register text NOT NULL,
    primary_id text NOT NULL,
    secondary_ids jsonb NOT NULL,
    registration_date date NOT NULL,
    public_title text NOT NULL,
    brief_summary text NOT NULL,
    scientific_title text,
    description text,
    recruitment_status text NOT NULL,
    eligibility_criteria jsonb NOT NULL,
    target_sample_size integer,
    first_enrollment_date date,
    study_type text NOT NULL,
    study_design text NOT NULL,
    study_phase text NOT NULL,
    primary_outcomes jsonb,
    secondary_outcomes jsonb
);


ALTER TABLE trial OWNER TO opentrials;

--
-- TOC entry 188 (class 1259 OID 24336)
-- Name: trial_document; Type: TABLE; Schema: public; Owner: opentrials; Tablespace: 
--

CREATE TABLE trial_document (
    trial_uuid text NOT NULL,
    document_uuid text NOT NULL,
    role trial_document_role,
    context jsonb NOT NULL
);


ALTER TABLE trial_document OWNER TO opentrials;

--
-- TOC entry 186 (class 1259 OID 24300)
-- Name: trial_intervention; Type: TABLE; Schema: public; Owner: opentrials; Tablespace: 
--

CREATE TABLE trial_intervention (
    trial_uuid text NOT NULL,
    intervention_uuid text NOT NULL,
    role trial_intervention_role,
    context jsonb NOT NULL
);


ALTER TABLE trial_intervention OWNER TO opentrials;

--
-- TOC entry 184 (class 1259 OID 24264)
-- Name: trial_location; Type: TABLE; Schema: public; Owner: opentrials; Tablespace: 
--

CREATE TABLE trial_location (
    trial_uuid text NOT NULL,
    location_uuid text NOT NULL,
    role trial_location_role,
    context jsonb NOT NULL
);


ALTER TABLE trial_location OWNER TO opentrials;

--
-- TOC entry 185 (class 1259 OID 24282)
-- Name: trial_organisation; Type: TABLE; Schema: public; Owner: opentrials; Tablespace: 
--

CREATE TABLE trial_organisation (
    trial_uuid text NOT NULL,
    organisation_uuid text NOT NULL,
    role trial_organisation_role,
    context jsonb NOT NULL
);


ALTER TABLE trial_organisation OWNER TO opentrials;

--
-- TOC entry 180 (class 1259 OID 24200)
-- Name: trial_person; Type: TABLE; Schema: public; Owner: opentrials; Tablespace: 
--

CREATE TABLE trial_person (
    trial_uuid text NOT NULL,
    person_uuid text NOT NULL,
    role trial_person_role,
    context jsonb NOT NULL
);


ALTER TABLE trial_person OWNER TO opentrials;

--
-- TOC entry 181 (class 1259 OID 24218)
-- Name: trial_problem; Type: TABLE; Schema: public; Owner: opentrials; Tablespace: 
--

CREATE TABLE trial_problem (
    trial_uuid text NOT NULL,
    problem_uuid text NOT NULL,
    role trial_problem_role,
    context jsonb NOT NULL
);


ALTER TABLE trial_problem OWNER TO opentrials;

--
-- TOC entry 187 (class 1259 OID 24318)
-- Name: trial_publication; Type: TABLE; Schema: public; Owner: opentrials; Tablespace: 
--

CREATE TABLE trial_publication (
    trial_uuid text NOT NULL,
    publication_uuid text NOT NULL,
    role trial_publication_role,
    context jsonb NOT NULL
);


ALTER TABLE trial_publication OWNER TO opentrials;

--
-- TOC entry 189 (class 1259 OID 24354)
-- Name: trial_record; Type: TABLE; Schema: public; Owner: opentrials; Tablespace: 
--

CREATE TABLE trial_record (
    trial_uuid text NOT NULL,
    record_uuid text NOT NULL,
    role trial_record_role,
    context jsonb NOT NULL
);


ALTER TABLE trial_record OWNER TO opentrials;

--
-- TOC entry 3072 (class 0 OID 24249)
-- Dependencies: 183
-- Data for Name: document; Type: TABLE DATA; Schema: public; Owner: opentrials
--

COPY document (uuid, source_uuid, name, type, data) FROM stdin;
\.


--
-- TOC entry 3061 (class 0 OID 24115)
-- Dependencies: 172
-- Data for Name: intervention; Type: TABLE DATA; Schema: public; Owner: opentrials
--

COPY intervention (uuid, name, type, data) FROM stdin;
c138bb82cf5449018f8ebf4f6e21e785	HBOT	\N	{}
7bd64404aadc49468c8bd3d5f2dae1ee	Low pressure hyperbaric oxygen therapy	\N	{}
d2e4af6ecfc349a2a170ddc3516e4a57	Carbetocin	\N	{}
7d67f9bedb014de486007f3f604b8983	Oxytocin	\N	{}
7257591b422b41f6ae085b16311e7fc8	Supplemental oxygen 80% FIO2	\N	{}
b11add84ff3f44d3982f375b9f586a0e	Use of air (no oxygen during surgery)	\N	{}
66a1642f11cb4b0d8e76f2b84e90425c	epidural steroid injection	\N	{}
6f9482b09ebf4c9a86f9f740e1b0963f	Sham epidural steroid injection	\N	{}
a14fc8615b114abb9add37506a2a189f	Gabapentin	\N	{}
ac2c33ef8f1f4567b1599384e7415c91	Placebo gabapentin	\N	{}
0d7fdc7c36aa43a89ad16b4af8c5665e	Hypertensive disorder of pregnancy	\N	{}
a022a1dcef4f4e62a6a88df8ebbb8e8b	guided imaginary	\N	{}
3d83643dbc1e48baa21c137461563e99	music ONLY	\N	{}
de0a10d04fe446feb896ef870cae4a18	Closed gravity drain	\N	{}
85263bf749e148a39026dc1af3bc4082	closed suction drain	\N	{}
240531882a414e3686a87dc5944f80e5	Hyperbaric oxygen therapy	\N	{}
33a701c020b640c59a04936790a5a75b	Mixtard 30:70 Novonordisk® twice daily	\N	{}
4294960629d34f11b0e216be44ec0bee	Lantus® once daily and Apidra® before meals	\N	{}
6e3c577df9e94d8ea498e91a768b8bb9	peer support	\N	{}
83ff72cc71314a3dbda940ed256bab03	Warfarin	\N	{}
208295130822444691628b33e9a996d6	Preterm fetus	\N	{}
f8e61682e4024a86965f335d51bf8050	azathioprine or adalimumab and infliximab	\N	{}
0508d7e224084067b88f904b6c35c2eb	Capsular Tension Ring	\N	{}
4f31b0c3a47b4dbb9b70bc3fbfe7d2f1	Cybernetic microradiosurgery	\N	{}
7cb42f9f6f6845d38febd02574bd8b5d	Conventional radiotherapy	\N	{}
484945a9cc464d87918d93fad5756568	Oral Vibrational Stimulation	\N	{}
89d25738fcba4ebaadf445401810637b	Exergames and conventional physiotherapy	\N	{}
b8391eec15404ee9a3a48530dae9e702	Conventional physiotherapy	\N	{}
c35a329a43bb4b3ea3aee78d3c3796d2	Qingxuan Decoction	\N	{}
97f23faa1b1449a2897f7f026bc9d5f4	sevelamer carbonate 800mg	\N	{}
83895d96d73b4d8d993e2bf2f118ea5f	sevelamer carbonate 2.4 g	\N	{}
67325bacb7a14b3196ddf434984ef982	Candidemia	\N	{}
8beb23bae22843f7bcdca03163d28c70	Electroacupuncture	\N	{}
60c6b2f452c645ddbbdf06b1672568c7	Hepatectomy	\N	{}
9e6ce76a84344e80b6242bb266cfc8e9	anti-EGFR CAR T	\N	{}
c17860ac994f4020b98dfd28f78fe493	VVZ-149 injection	\N	{}
37201bc685c648cdafdb201b2d21c521	Placebo	\N	{}
2bbd0cde945d476ab259e2d269f7b94e	Ablative treatment	\N	{}
8c178594034549a8bf4933fccfe6c6b4	Expectant management	\N	{}
221758b59d96469e9e2e06909c60e134	Experimental treatment	\N	{}
9b24223f13ff4d11b2a35332ffb84d90	Placebo treatment	\N	{}
04944a98b99445b29f61f5b815e57995	Granulocyte colony-stimulating factor	\N	{}
ef4eab939b574180a36117b642cc7da6	standard treatment	\N	{}
d3a90d70dda6460287f9ab78a1607e8e	Lifestyle Counseling	\N	{}
205f8202d20342b2a769509d44ab16cd	Endoscopic Technique	\N	{}
91c6f8e441354297955b596c54c82eed	Microscopic Technique	\N	{}
0963878ab878474cb7214180ceec1cf5	High resolution manometry (HRM)	\N	{}
791b50933650456083fd76d2262ebfd4	Computerized Plasticity-based Software	\N	{}
16dc49e0f8dd4986a09e5cc2722884b3	Commercially available Video Game	\N	{}
e294028dcb4c4089adddec3656977549	Isoniazid Aminosalicylate Tablets	\N	{}
e4ac677bb9944c0b8ea26ba65b232ccb	Streptomycin injectable	\N	{}
9eabc141943e4b72af88064e4b3ddd05	Methylprednisolone	\N	{}
714ae361a6bf4cffb7506567f8d34383	Erdos	\N	{}
bf0e1d6e65144873a4ec7c9ba7fccdce	Talion	\N	{}
552a1def225b4b2598056527b0a7cea6	Erdos, Talion	\N	{}
d7d532dd2543431198ada81fee492a66	Androgel (Testosterone Gel)	\N	{}
b0819b11d73d472987bc111046d53244	Anastrozole (Aromatase Inhibitor)	\N	{}
fc63ae2cf15f4be0ade88b47daa1bc71	Placebo tablet	\N	{}
07f7ebb955cd4db492a469ff8f53dfb1	Placebo gel	\N	{}
e68cf4aaa59043f1bd52c355f6fa3dcb	Calcium Cardone 500mg with vitamin D 400 IU	\N	{}
0e2f1fb2a3244673a066afb7a22d233b	Low fat- Low glycemic index meal	\N	{}
a8fefab04a16482399b27b5c2d56dd56	MUFA- Low glycemic index meal	\N	{}
385e462c2d9444a68f1a05dd9df3e3b8	SAFA- Low glycemic index meal	\N	{}
90e60cfb425d45778c19a95ca141c197	Low fat- High glycemic index meal	\N	{}
698980c894f847f5bf0294e2919842e4	MUFA- High glycemic index meal	\N	{}
4361a7b991d74701a352e209b4c1f8f9	SAFA- High glycemic index meal	\N	{}
3195d10f52ff41d4a1f9c8d764038c92	Speech perception tests and self-rating questionnaire	\N	{}
69896b982937415182b8c6961ca1ae75	combowire and IVUS	\N	{}
\.


--
-- TOC entry 3066 (class 0 OID 24165)
-- Dependencies: 177
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: opentrials
--

COPY location (uuid, name, type, data) FROM stdin;
3500028ee6444b3d839682abbd701737	Czech Republic	country	{}
94d8c76c722c4e35960d4d8505077bab	Poland	country	{}
439226a0038649ac8b699510a24c0bff	Switzerland	country	{}
06b39f78a0f64cd99c6230ac38be4dc9	Panama	country	{}
127c1d9ef08d4058a1af6b699adc33a6	Thailand	country	{}
22be7599112045caa099dca25d909dbf	Germany	country	{}
da0156d584de42c687462b5652476845	Greece	country	{}
b204af8b84084ada993875e3c41eeeb3	China	country	{}
07f0bc1855354eb0ab31629964ea6d3a	United States	country	{}
6fe3e8b5a2a445a3b641dd10ba8791c1	Brazil	country	{}
d434fdbff63c4317bba6088a9143fb40	Italy	country	{}
2d86baea02f2401aa971b8538a7f5afc	Israel	country	{}
2337302ab55f4c6281dfebc9dcdfa0ec	Japan	country	{}
\.


--
-- TOC entry 3067 (class 0 OID 24175)
-- Dependencies: 178
-- Data for Name: organisation; Type: TABLE DATA; Schema: public; Owner: opentrials
--

COPY organisation (uuid, name, type, data) FROM stdin;
c483b0e0aaad487881aafb9e2088c5bc	Johns Hopkins University	\N	{}
a78c07aeacb14b159ecb3f8012dae83d	Assaf-Harofeh Medical Center	\N	{}
0221fc4389b04de996d1b30bd578c751	University Hospital Hradec Kralove	\N	{}
03815e045b6c4ba4bef3391c2d1f12d5	Paul G. Harch, M.D.	\N	{}
7c7c0d5a6dac47988dc148b43d3c3893	Hospital Universitario Central de Asturias	\N	{}
db1fd15b3ffa4f5fbd5c9330035f861d	Universitätsklinikum Hamburg-Eppendorf	\N	{}
49b6ec893f70434fa57f6322d0e3eb15	Cedars-Sinai Medical Center	\N	{}
e18020c1d1d44f4a9a4147aab842fb16	Tokyo Medical and Dental University	\N	{}
76416694638b48ce891f91b361e0903d	EyeKon Medical, Inc.	\N	{}
255be92d14274467903f1d4287da5823	Sheba Medical Center	\N	{}
41a8ee95769b4fb080ef7a4a4e33faf4	Maria Sklodowska-Curie Memorial Cancer Center, Institute of Oncology	\N	{}
aeeb5624110b49a08a1667d1adf6b789	Seoul National University Bundang Hospital	\N	{}
00cf321b551e4e5a8d0362e07f7434ba	Arizona State University	\N	{}
7d3be9ab085045aeb0e879518ebd3acc	Universidade Cidade de Sao Paulo	\N	{}
eb5415c2b5fa408c99bbf581818b7261	Heilongjiang University of Chinese Medicine	\N	{}
c4f70b921c06433e82c8631256ae2d1e	University of Sao Paulo General Hospital	\N	{}
4ec33605b1cb48a4b51b100d58d191e5	Genzyme, a Sanofi Company	\N	{}
98ccfa2d39dd44f9804f9f767fbff069	Universitaire Ziekenhuizen Leuven	\N	{}
78f766c6308a499f84db6f711cdf88d8	University of Zurich	\N	{}
c0e5d38362da4cfba3992287f83ef34d	Chinese University of Hong Kong	\N	{}
6930ebf38495452f9136221d0ac11d7d	University of Milan	\N	{}
57cc21ecbd234a5fbd9eb575ac9af3c7	RenJi Hospital	\N	{}
becceb4e85f745ddbe937c1ebe4f351d	Vivozon, Inc.	\N	{}
b8cacfcf581e4379a3e71e80cb3a2a0b	Saint Thomas Hospital, Panama	\N	{}
93c2c4da5f6143afbbde069ac1fa5bdc	IRCCS National Neurological Institute "C. Mondino" Foundation	\N	{}
3316c9a598ba43e78cb2fff8bc78dffb	Beijing 302 Hospital	\N	{}
318f942ce0754397a846cdcb86aea027	Peking University Third Hospital	\N	{}
3cdb545e1c5b448bb8fcd9b6816d3dd9	Prince of Songkla University	\N	{}
0768ae9ad2fd46be81f1a9f478bc1f97	Technische Universität München	\N	{}
adbe86134a3a44cfb472c9d61ed70552	AHEPA University Hospital	\N	{}
e2180cf12a46485880f1350f4ec90b0e	Posit Science Corporation	\N	{}
9122f1a11ac54142b99c26beab20d880	Shanghai Pulmonary Hospital, Shanghai, China	\N	{}
e6922a13b4874c33919fe22a13fdf273	National Cheng-Kung University Hospital	\N	{}
96f9594713f743e887d68c29a6096ceb	Daewoong Pharmaceutical Co. LTD.	\N	{}
be55c5c4779248168584cb2b372830c1	National Institute on Aging (NIA)	\N	{}
21e42343ae7f41abb58184c3550bf0bb	Hospital Sao Domingos	\N	{}
9927ec0b579d4e7dbd2754eab55769ee	Federico II University	\N	{}
58fc9543c620453f94f721caebfb5fcd	Bnai Zion Medical Center	\N	{}
4735b27e7cc14b4b8c5a949ca2b6ef36	Hyogo College of Medicine	\N	{}
\.


--
-- TOC entry 3062 (class 0 OID 24125)
-- Dependencies: 173
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: opentrials
--

COPY person (uuid, name, type, data) FROM stdin;
e6ccd9b124624093ab7e700a084a1fce	Bleixen Admadé, Resident	\N	{}
334fda8be1314b9da3a4d3f2e9ce77fa	Steven P Cohen, MD	\N	{}
d62038e64da7456c84abdefd0c661929	Joanna Buitrago, MD	\N	{}
fdc37a9b8e3d44f8b0188f93abfa104e	Mariana Rachmiel, MD	\N	{}
a18640ecb10f4eeb8eafae9a334f1570	Filip Cecka, MD, PhD	\N	{}
f69c94aa39c04496accf2c8e0b05a4d4	Osvaldo A Reyes, MD	\N	{}
5aa78b08e4334f5cbf5cfa271f121041	Paul G Harch, M.D.	\N	{}
e10b9bb0254644bf806710d63d4dd0af	Edelmiro Menéndez Torre	\N	{}
fb212854869e422a82c1372c0cf6ad0f	Thomas Bock, Prof. Dr.	\N	{}
bb7f42120cfc4007b9f64eb2b8ff86c0	Raj Makkar, MD	\N	{}
2751857c81924a728c5549d42171262d	Toshimitsu Fujii	\N	{}
049bc3c01ff54dcca4dfec7fcaf76101	Hyo-Jung Lee	\N	{}
162fb3ac658c455fa2b60965f1f28dac	Jennifer Huberty, PhD	\N	{}
7ef6b944ef0948a9bea600b6faa40b4a	Monica R Perracini, Phd	\N	{}
e99e246a7b154289b79a98a1a34fddbb	Yang Xu Yan, Doctor	\N	{}
19b782ed88224a1ea56d16f640e8e4fc	Gustavo C Campos, Phd	\N	{}
b88a94cb5fc14ad7914bfeaa2fef4fbf	Katrien Lagrou, Prof.	\N	{}
ea89c10997b041649cdd2012e2f75c1b	Gunther FL Hofbauer, MD	\N	{}
2d8b790d6a5f4ae1bc95fc8d7c693df1	Jae Yong Chung, MD, PhD	\N	{}
2df809b9dff44c54abaf7023a62e5c06	Osvaldo Reyes, MD	\N	{}
acf67b8b267c4fc5b050aeac54fc0012	Giorgio Sandrini, MD	\N	{}
d253bc19203c47eb993ac7bb02e188f0	jinhua hu, Dr. and PhD	\N	{}
244316ac33cc41cfa29cf81723c8dbf5	Yuvatiya Plodpai, MD	\N	{}
70c0d2de05444d5ca60e4f26a1b6c6c4	Simon Nennstiel, Dr. med.	\N	{}
b5140f493eea4dfda02de41d31703607	Christoph Schlag, Dr. med.	\N	{}
d2e32efdb6b9453ab51621a42f03eba7	Monther Bajbouj, PD Dr. med.	\N	{}
18e38b2a89844093b6f0bbbb2a2b05ec	Maria P. Yavropoulou, M.D	\N	{}
a4590991d1ca4052a1aaef028632b780	Hyunkyu Lee, Ph.D.	\N	{}
1a3bcee9da794b49b29e893f001352be	Heping Xiao, M.D	\N	{}
f8672a130503472194431f12f677deb9	Josephine M Egan, M.D.	\N	{}
5065526551e74ab68a9e933b89e014a4	JOSE R AZEVEDO, PhD	\N	{}
fd969e7040724496b5bb4138ead4b407	Michal Luntz, MD	\N	{}
\.


--
-- TOC entry 3065 (class 0 OID 24155)
-- Dependencies: 176
-- Data for Name: problem; Type: TABLE DATA; Schema: public; Owner: opentrials
--

COPY problem (uuid, name, type, data) FROM stdin;
14121de3fdbf47c8af8d3d3df86083c9	Residual Neurological, Cognitive, Emotional, Behavioral Effects From Traumatic Brain Injury	\N	{}
8ade1b55bd6f4e53a207476c29a40f6d	Neuropsychiatric Sequelae of Carbon Monoxide Poisoning	\N	{}
f88466d7336f436fbdb30228a84dad0b	TBI (Traumatic Brain Injury)	\N	{}
388759ea52f7474f849fe948302aa4e9	Post Concussion Syndrome	\N	{}
46db163ce97c44e8b9e0fde4efc82b8a	Post Traumatic Stress Disorder	\N	{}
7bd2d89a8e404661bb13b1aaafc1a550	Chronic Post Traumatic Stress Disorder	\N	{}
354c114a67df4f6cb3a5cc8d6a00a795	Preeclampsia	\N	{}
b43b22e101694a56bae74baa6a99523e	Postpartum Hemorrhage	\N	{}
3f7e775451e4471da92b88528c27e725	Surgical Wound Infection	\N	{}
215b20219be14696aeda647c29f02b59	Sciatica	\N	{}
043dbafcaeab4a2b8fa5858fbb1f4032	Radiculopathy	\N	{}
64fef3b80ae342d6b509802c32b3996e	Hypertension, Pregnancy-Induced	\N	{}
51f9134483fa4e9b9540328fb7513f67	Diabetes Mellitus, Insulin-Dependent	\N	{}
7e0fd9f688564de8af15e57ce6fef2fb	Fetal Growth Restriction	\N	{}
2042106c7720405994eee98f56a88410	Antiphospholipid Syndrome	\N	{}
72e9452dbc7c418b8f86a6da94945f44	Pancreaticoduodenectomy	\N	{}
d087d85b19ba4e5ab6836b6828bedec8	Distal Pancreatectomy	\N	{}
b05484c7ebf44222818afb269a2e2499	Restless Leg Syndrome	\N	{}
677157d36e644477a011b6081473c48d	Severe Preeclampsia	\N	{}
5218ada4ed0a400f869b7c3771761217	Adult and Pediatric Chronic Cerebral Disorders	\N	{}
9bdac79453a34886abed7901d9796ef8	Type 2 Diabetes Mellitus	\N	{}
8111e1aaf2da4fb788d4531ca97499a9	Psychosis	\N	{}
c5d388fcd6024e2fa2a9a3c57ca6d9a5	Major Depression	\N	{}
38859b6577da42fd936f71acef462d50	Bipolar Disorder	\N	{}
a4f4c06d492f49ffaea81c0eaa64720b	Borderline Personality Disorder	\N	{}
c72eaec657eb4199bcca43b68a0ea526	Prosthetic Valve Thrombosis	\N	{}
b80ed90c0fdd4903b30fbbb27020c1d8	Respiratory Distress Syndrome, Newborn	\N	{}
29bfe06aa1f54b168687eae954f2a421	Crohn Disease	\N	{}
88a8f5c3f94a48abbffe72131b6e9be1	Cataract Extraction	\N	{}
d06f804a410e47e5a40870f9f21a8e47	Breast Milk, Composition, Microbiome	\N	{}
6bfa0686cbb14c4787444716b26aad9a	Hemangioma of Vertebral Column	\N	{}
bb07784fa6474dcfadac6215aa34c412	Mild Cognitive Impairment	\N	{}
ca4d89b7348c4db2968fb399b792584f	Self Esteem	\N	{}
65e1a2d10cdd4b9cbf50c468ba403bb5	Physical Activity	\N	{}
d5de1b23c22c4d1d88b4f7f7936cd9a7	Frail Elderly	\N	{}
39167eadc5044a5d804e56570d9d7450	Oral Lichen Planus	\N	{}
a3175e00a4044b17a53dd9946db0fd3d	Osteoporotic Fractures	\N	{}
c3ca293459484d9199c7cf6fd07f5937	Osteonecrosis	\N	{}
2a55ed2821c34cb8b31a910096bcdffb	Renal Failure Chronic	\N	{}
8b99c1d6d7d34137882058c1435028f4	Candidemia	\N	{}
6654f996c23647c2b69816b2da9a6721	Heart Cancer	\N	{}
29a38a36175149a185031adb89295c11	Kidney Cancer	\N	{}
17d61122f429428ab834178e2b6c5738	Lung Cancer	\N	{}
1b910b28daf946e282ac9c38de56c6ce	Pancreas Cancer	\N	{}
f175e36b8f3a4c97a5d963702a5baceb	Liver Cancer	\N	{}
d85d64b862af452ea9eefa5e8da2c414	Cancer of Pancreas	\N	{}
0c119a3cf39a40e89412adb33ed4af31	Pain	\N	{}
cf68a1b9dbbd48d5aa62d7db753ddcdb	Colorectal Liver Metastases	\N	{}
2f4dddd5a35a4c8d85402131aedbef11	Colon Cancer	\N	{}
2e287956579a4d11ae1eddc9bef3c8a1	Advanced Glioma	\N	{}
457cc40b68614a579ecc9d4ad7e6aba3	LSIL, Low-Grade Squamous Intraepithelial Lesions	\N	{}
d7d09d597fde401ab4c21c0df0a4f88a	Multiple Sclerosis	\N	{}
1972745fcb1f477fa7a4f54af36d485a	Liver Failure	\N	{}
db27aab89bf141ec9f22d9523bf93e78	Hepatitis B	\N	{}
2429e2e3a56948ffba0d572ecc59785a	Alcoholic Liver Disease	\N	{}
fe7f70f980aa43ce8dcf0dccbf277a4d	Polycystic Ovary Syndrome	\N	{}
ac73f4a609444f2f8842b2e06c93a810	Tympanic Membrane Perforation	\N	{}
d387f9b715ee421dbb8dcf6f0a86434f	Eosinophilic Esophagitis	\N	{}
2e4bd27c02ce40e8beb4dea437f59854	Tumor Induced Oncogenic Osteomalacia	\N	{}
d40afb1908184a59b377d48279c90e84	Older Adults, Aging Brain	\N	{}
67c5e848cb21459eb4d1066989392b0d	Reinfection Pulmonary Tuberculosis	\N	{}
8d0964a33d0f4069a2278dcae698aed2	Urinary Tract Infection	\N	{}
78b17042f6e247c69b8fef8e77a1ec04	Healthy	\N	{}
aee82d5225e24dd9bf2bd1a6136794c5	Hypogonadism	\N	{}
8c6f5144786f49129a8f2b46f0a3ddd2	Diabetes	\N	{}
d04f156c7cec452f86d9d7b2a7d507c3	Sarcopenia	\N	{}
32a3697fd7f24ffdae5a63f8367e6880	Osteoporosis	\N	{}
752a63e1933c46428f10987ad45a21f0	Cognition	\N	{}
89a287cfba5f4a87a0da7586902aded3	Critical Illness	\N	{}
c14fe62259144aaa8178b8eb240c638f	Type 1 Diabetes	\N	{}
9feab24f62b6405c96bef8712c6f2d3d	Deafness	\N	{}
502770061a6047a4abbc19b3186b59cf	Coronary Stenosis	\N	{}
\.


--
-- TOC entry 3068 (class 0 OID 24185)
-- Dependencies: 179
-- Data for Name: publication; Type: TABLE DATA; Schema: public; Owner: opentrials
--

COPY publication (uuid, source_uuid, name, type, data) FROM stdin;
\.


--
-- TOC entry 3071 (class 0 OID 24236)
-- Dependencies: 182
-- Data for Name: record; Type: TABLE DATA; Schema: public; Owner: opentrials
--

COPY record (uuid, source_uuid, type, data) FROM stdin;
b3b596f3c7cb4e9b8916b9f2a6274c71	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT00594503"}
79ba1736e648475193ce1f196e4ea2f8	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT00596180"}
707dc929e6994b6aa35efcf66248a330	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT00760734"}
bd78310fa6244d4d99f9dd7ddc0976c4	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT01374477"}
bcb072d0446740d0a502c5855ca73b7d	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT01382732"}
04d56142704a4fc29744798d61b9fe15	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT01340534"}
4972c057e5a9458da7f628c01fd49ffe	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT01495923"}
e0a1119082b446d7b6663e4a28133b10	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT01508208"}
2cda92a44a5a495bbd7db0bf2d24a443	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT01538121"}
e32be195032a48b9925ae07096fd86ff	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT01567254"}
ebf0ae74a20940aeaab1512067bb0a31	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT01538134"}
d6514f1c9e9040abab8f083966dfecb1	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT01988519"}
c22f1839c45443b992d79c2ee90aecff	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT01538147"}
4dc4b5dcc5b4449faa97102ebabdfe5d	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT00592891"}
91c2da63b51142ada672b2e9510b91c3	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02333851"}
e2c6d9345c264ad28904e86cc17ddf21	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02276469"}
b4ea74619ccf41398ac8e2fbace91215	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02318342"}
981dde3f56084f0aa8e7de63ee4d0243	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02332304"}
c1b7bc9ae88e44f7b6f72306fa19b2ab	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02332356"}
d8b7d2a726af4c599acfaeccca73fb5d	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02332369"}
0f3d2634ccbe4c9ca06b09a9d9be205d	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02332382"}
9872bc9c248a4f70b48a4e0f73268765	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02332408"}
6105e968d2bc43b1bf65b75f6077068f	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02332525"}
9f255eb081cf435fbc7c09e156f37435	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02332746"}
d6c9d5dddebc428197815dae794861bb	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02333214"}
bad1cf9c0d8a45e781b701b5110dd821	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02332486"}
c3ec0ddde2c74c8cb163024a9ad79026	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02332681"}
ef7c6e2cedfd4997b1349f1cfc390804	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02332811"}
79cdbaa6205146729a48730b4b61bb1f	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02333266"}
b3aded779a6e4184bff1a3a3a7bb2c28	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02333279"}
32a18e8c10314943a3edc577175e800f	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02333409"}
5102dd224de841429b5de1df2c77fddb	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02331641"}
be51d4f55d8d45e7a07efac063eb6492	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02331693"}
5cdd6a1fcfbc466db1af6d85c6cdd303	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02333318"}
977234215f03499c97d98ed378a7a8e9	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02331550"}
1213f73b315b4e50bc73c02565dd1e1c	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02331654"}
658b2faefee347e2bfdfa0072a5c2b2b	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02331745"}
74525092d5dc4af3898f98dacb245f0b	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02331758"}
d9ec0bd4ec1f475f9c97ecc008c85baa	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02331797"}
ae4ec70b4a14435abe4bf7c59bb2285d	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02331849"}
d27f6d1b2f414365b556314478d2acfb	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02331966"}
120e83ac9e514cc5a13554b256ce6042	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02331784"}
e9f360916a104c31beecc027bdfe580d	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02331823"}
c337994f120d4f03bc1c3086540044a0	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02331862"}
cb91e915c7c6413db44dfdde0e4d166b	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02332044"}
63fe6ffe2d82445dbbdd97840fab9a5b	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT00104572"}
1e1e402d3156464bb95014b646f1a118	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02330874"}
36831b78518e493bb1cd0d18a4ffd1ea	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02330939"}
216661374e2647f089e918a90279ce33	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02331017"}
56a44f6a61c94a2b8e55993c27219b4a	f09e54e944544b81a7ad73deb7302fd8	trial	{"nct_id": "NCT02330861"}
\.


--
-- TOC entry 3064 (class 0 OID 24145)
-- Dependencies: 175
-- Data for Name: source; Type: TABLE DATA; Schema: public; Owner: opentrials
--

COPY source (uuid, name, type, data) FROM stdin;
f09e54e944544b81a7ad73deb7302fd8	nct	register	{}
\.


--
-- TOC entry 3063 (class 0 OID 24135)
-- Dependencies: 174
-- Data for Name: trial; Type: TABLE DATA; Schema: public; Owner: opentrials
--

COPY trial (uuid, primary_register, primary_id, secondary_ids, registration_date, public_title, brief_summary, scientific_title, description, recruitment_status, eligibility_criteria, target_sample_size, first_enrollment_date, study_type, study_design, study_phase, primary_outcomes, secondary_outcomes) FROM stdin;
53ff08be34ff44e19554c980e6c2dddb	nct	NCT00594503	{"others": null}	2008-01-03	Hyperbaric Oxygen Therapy and SPECT Brain Imaging in Traumatic Brain Injury	Hypothesis: That SPECT brain imaging tracks and is consistent with clinical improvements in\n      patients receiving hyperbaric oxygen therapy (HBOT) for chronic traumatic brain injury.	Hyperbaric Oxygen Therapy and SPECT Brain Imaging in Traumatic Brain Injury	The study is a retrospective chart review of patients with chronic neurological, emotional,\n      social, and cognitive deficits from mild, moderate, or severe traumatic brain injury who\n      underwent SPECT brain imaging as part of their evaluation and treatment with hyperbaric\n      oxygen therapy in my practice over the last two decades. The purpose of the study is to see\n      if the functional imaging is consistent with the clinical and cognitive testing.	Recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Adults or children with traumatic brain injury at least one year old\\n\\n        Exclusion Criteria:"}, "maximum_age": "N/A", "minimum_age": "N/A", "healthy_volunteers": "No"}	45	2007-01-01	Interventional	Endpoint Classification: Safety/Efficacy Study, Intervention Model: Single Group Assignment, Masking: Open Label, Primary Purpose: Treatment	Phase 1	[{"measure": "SPECT brain imaging", "time_frame": "After completion of HBOT", "description": "Only for those subjects in which SPECT brain imaging was performed before hyperbaric oxygen therapy", "safety_issue": "Yes"}]	[{"measure": "Clinical history and physical exam", "time_frame": "After completion of HBOT", "safety_issue": "Yes"}, {"measure": "Cognitive testing", "time_frame": "After the final HBOT", "description": "Only for those subjects in which neuropsychological cognitive testing was performed before hyperbaric oxygen therapy", "safety_issue": "Yes"}]
44b69aa9f0b3405b9b3c538068f3f074	nct	NCT00596180	{"others": null}	2008-01-04	Hyperbaric Oxygen Therapy and SPECT Brain Imaging in Carbon Monoxide Poisoning	That SPECT brain imaging tracks and is consistent with clinical history and physical exam as\n      well as cognitive testing.	Hyperbaric Oxygen Therapy and SPECT Brain Imaging in Carbon Monoxide Poisoning	The study is a retrospective review of the PI's experience using SPECT brain imaging and\n      hyperbaric oxygen therapy in the diagnosis and treatment of non-acute phases of carbon\n      monoxide poisoning. The purpose is to see if the SPECT brain imaging is consistent with the\n      clinical condition and cognitive testing on the patients.	Recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Adults and children with non-acute carbon monoxide poisoning who underwent SPECT\\n             brain imaging as part of their evaluation and treatment\\n\\n        Exclusion Criteria:"}, "maximum_age": "N/A", "minimum_age": "N/A", "healthy_volunteers": "No"}	40	2007-01-01	Interventional	Endpoint Classification: Safety/Efficacy Study, Intervention Model: Single Group Assignment, Masking: Open Label, Primary Purpose: Treatment	Phase 1	[{"measure": "SPECT brain imaging", "time_frame": "after completion of HBOT", "safety_issue": "No"}]	[{"measure": "clinical history and physical exam", "time_frame": "after completion of HBOT", "safety_issue": "No"}, {"measure": "Neuropsychological testing", "time_frame": "After the final HBOT", "description": "Neuropsychological testing performed after the final HBOT in those who had neuropsychological testing before HBOT", "safety_issue": "Yes"}]
d1de51d8fe8e459090da7be435e870a4	nct	NCT00760734	{"others": null}	2008-09-25	Hyperbaric Oxygen Therapy (HBOT) in Chronic Traumatic Brain Injury (TBI)/Post Concussion Syndrome (PCS) and TBI/Post-Traumatic Stress Disorder (PTSD)	This is a pilot trial to see if one or two 40 treatment courses of low pressure hyperbaric\n      oxygen therapy can improve cognition and brain imaging in subjects with either chronic\n      mild-moderate traumatic brain injury (TBI), also known as post-concussion syndrome (PCS) or\n      chronic PCS with post-traumatic stress disorder (PTSD) secondary to blast injury.	HBOT in Chronic Traumatic Brain Injury/Post Concussion Syndrome and TBI/PTSD Pilot Trial	\N	Completed	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Adults, 18-65 years old\\n\\n          -  One or more mild-moderate TBI's characterized by loss of consciousness due to blast\\n             injury that is a minimum of one year old and occurred after 9/11/2001\\n\\n          -  Absence of acute cardiac arrest or hemorrhagic shock at time of TBI.\\n\\n          -  Absence of intracranial neurosurgery post-TBI\\n\\n          -  Disability Rating Scale of 0-3\\n\\n          -  Negative Michigan Alcohol Screening Test (MAST)\\n\\n          -  Negative Drug Abuse Screening Test (DAST)\\n\\n          -  Negative urine toxicology screen for drugs of abuse\\n\\n          -  Negative pregnancy test in females\\n\\n          -  Otherwise good health\\n\\n          -  Less than 90% on the Percent Back to Normal Rating Scale\\n\\n        Exclusion Criteria:\\n\\n          -  Pulmonary disease that precludes HBOT\\n\\n          -  Unstable medical conditions that are contraindicated in HBOT\\n\\n          -  Severe confinement anxiety\\n\\n          -  Pregnancy\\n\\n          -  Other pre-TBI neurological diagnoses\\n\\n          -  Pre or post TBI history of substance abuse\\n\\n          -  Pre or post TBI history of alcoholism.\\n\\n          -  Participation in another experimental trial with active intervention.\\n\\n          -  High probability of inability to complete the experimental protocol.\\n\\n          -  Previous HBOT\\n\\n          -  History of hospitalization for past TBI, stroke, nonfebrile seizures, or any seizure\\n             history other than seizure at the time of TBI\\n\\n          -  Past or current history of mental retardation (baseline FSIQ < 71.\\n\\n          -  Pre/post-TBI history of systemic illness with impact on CNS (P.I.'s decision)"}, "maximum_age": "65 Years", "minimum_age": "18 Years", "healthy_volunteers": "No"}	\N	2008-09-01	Interventional	Allocation: Non-Randomized, Endpoint Classification: Safety/Efficacy Study, Intervention Model: Single Group Assignment, Masking: Open Label, Primary Purpose: Treatment	Phase 1	[{"measure": "Psychometric testing", "time_frame": "30 days", "safety_issue": "No"}]	[{"measure": "SPECT brain imaging", "time_frame": "30 days", "safety_issue": "No"}, {"measure": "Quality of life measurements", "time_frame": "30 days", "safety_issue": "No"}, {"measure": "Return to school or work", "time_frame": "6 months", "safety_issue": "No"}]
ec0af25421a14d76bccef2597e738cb2	nct	NCT01374477	{"others": null}	2011-06-14	Hypertensive Disorders of Pregnancy in Adolescence and Primipaternity	Hypertensive disorders of pregnancy are one of the most frequent complications of pregnancy,\n      being a serious health problem around the world.\n\n      Previous studies have suggested that there is an association between a short period of\n      exposure to paternal sperm of a new sexual partner and the development of an immunological\n      reaction that could trigger a hypertensive disorder of pregnancy. For this reason we want to\n      study the relationship between the primipaternity concept (exposure to male antigens present\n      in semen over a short period of time previous to the pregnancy) and the development of\n      preeclampsia in adolescents.	Hypertensive Disorders of Pregnancy in Adolescence and the Primipaternity Concept. Cases and Control Trial	\N	Recruiting	{"gender": "Female", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  19 year old or less\\n\\n          -  Pregnancy > 24 weeks at the moment of delivery\\n\\n        Exclusion Criteria:\\n\\n          -  20 years old or more.\\n\\n          -  Pregnancy < 24 weeks at the moment of delivery"}, "study_pop": {"textblock": "Patients < 19 years old who delivered in our institution."}, "maximum_age": "19 Years", "minimum_age": "N/A", "sampling_method": "Probability Sample", "healthy_volunteers": "No"}	110	2012-06-01	Observational	Observational Model: Case Control, Time Perspective: Prospective	N/A	[{"measure": "Presence of a primipaternity factor", "time_frame": "Two months", "description": "The presence of primipaternity factor. They include:\\nSexual Cohabitation (timeframe between first sexual intercourse and pregnancy < 4 months)without the use of a barrier contraceptive.\\nOral sex with ejaculation (previous to pregnancy < 4 months).", "safety_issue": "No"}]	[{"measure": "Maternal complications", "time_frame": "Two months", "description": "Presence of a complication related to preeclampsia: abruptio placenta, HELLP syndrome, eclampsia.", "safety_issue": "No"}]
15d338c686c94190a5762b91cc54a223	nct	NCT01382732	{"others": null}	2011-06-24	Carbetocin vs. Oxytocin for Prevention of Postpartum Bleeding in Patients With Severe Preeclampsia	Postpartum hemorrhage is an important cause of maternal morbidity and mortality. In patients\n      with severe preeclampsia there is an increased risk of postpartum hemorrhage but the\n      hemodynamic changes associated with this pathology make the management of any kind of\n      bleeding particularly troublesome. There are many pharmacological options, being oxytocin\n      the first line of treatment. However there is no evidence about the safety and efficacy of\n      carbetocin, an oxytocin agonist. The investigators aimed to compare oxytocin with carbetocin\n      for the routine prevention of postpartum hemorrhage in patients with severe preeclampsia.	Carbetocin Versus Oxytocin for Prevention of Postpartum Hemorrhage in Patients With Severe Preeclampsia: a Double Blind Randomized Controlled Trial	\N	Recruiting	{"gender": "Female", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Pregnant women between 28 weeks and term\\n\\n          -  Severe pre-eclampsia\\n\\n        Exclusion Criteria:\\n\\n          -  Twin pregnancy\\n\\n          -  Coagulation disorders\\n\\n          -  HELLP Syndrome\\n\\n          -  Eclampsia"}, "maximum_age": "N/A", "minimum_age": "N/A", "healthy_volunteers": "No"}	636	2012-01-01	Interventional	Allocation: Randomized, Endpoint Classification: Safety/Efficacy Study, Intervention Model: Parallel Assignment, Masking: Double Blind (Subject, Caregiver, Investigator), Primary Purpose: Prevention	Phase 3	[{"measure": "Need for additional uterotonics", "time_frame": "Six months", "description": "Number of cases allocated to one arm of the study that due to the presence of continous bleeding postpartum need the use of an additional uterotonic.", "safety_issue": "No"}]	[{"measure": "Development of oliguria", "time_frame": "six months", "description": "Number of cases that develop oliguria (<30 mL/hr over a 2 hour period) after the administration of the drug.", "safety_issue": "No"}, {"measure": "Changes in hemodynamic status", "time_frame": "six months", "description": "Changes in Systolic pressure , dyastolic pressure, mean arterial pressure and heart rate one and two hours after the administration of the drug.", "safety_issue": "Yes"}]
11184694aa97459280d37318a5c71cb7	nct	NCT01340534	{"others": null}	2011-04-14	Supplemental Perioperative Oxygen to Reduce the Incidence of Post-cesarean Wound Infection	The purpose of this study is to determine if the use of supplemental oxygen at 80% FIO2 can\n      reduce the incidence of surgical site infection after emergency cesarean section.	Supplemental Perioperative Oxygen at 80% FIO2 to Reduce the Incidence of Post-cesarean Wound Infection. A Randomised, Clinical Trial	Surgical site infection (SSI) is one of the most important complications that can develop\n      after a cesarean section. SSI can be mild or it can develop into septic shock and death,\n      being cesarean section the most important cause of puerperal infections. Supplemental oxygen\n      at high doses has been advocated as a protective factor for SSI. The purpose of this study\n      is to determine if the use of oxygen at high doses (80% FIO2)can reduce the incidence of SSI\n      after emergency cesarean section.	Completed	{"gender": "Female", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Gestational age > 37 weeks\\n\\n          -  Emergency cesarean section\\n\\n          -  Regional Anesthesia\\n\\n        Exclusion Criteria:\\n\\n          -  Elective cesarean section\\n\\n          -  Fever of unknown origin at admission\\n\\n          -  Twin pregnancy\\n\\n          -  Chorioamnionitis\\n\\n          -  Acute fetal distress that requires general anesthesia\\n\\n          -  Immunocompromise\\n\\n          -  Maternal Lung/Respiratory Disease"}, "maximum_age": "N/A", "minimum_age": "N/A", "healthy_volunteers": "No"}	\N	2011-10-01	Interventional	Allocation: Randomized, Endpoint Classification: Efficacy Study, Intervention Model: Parallel Assignment, Masking: Open Label, Primary Purpose: Prevention	Phase 3	[{"measure": "Number of participants with surgical site infection (SSI).", "time_frame": "2 months", "description": "The patients will be evaluated for evidence of surgical site infection before leaving the hospital, at 15 and 30 days post surgery. The presence of fever, supurative secretion through the wound or cutaneous changes compatible witn infection will be considered a surgical site infection (SSI). This outcome will be evaluated with a qualitative variable (presence of SSI). The patients will be clasiffied in accordance as \\"With SSI\\" or \\"Without SSI\\". This will allow us to determine if the use of oxygen at 80% FIO2 can reduce the incidence of SSI.", "safety_issue": "No"}]	[{"measure": "Number of participants with respiratory complications trans or post surgery.", "time_frame": "2 months", "description": "Every patient will be evaluated during surgery and before leaving the hospital for signs of a respiratory complication (persistent cough, fever, dyspnea, atelectatic rales, wheezing). The presence of any of these signs will be used to classify the patients with a qualitative variable (\\"With Respiratory Complications\\" or \\"Without Respiratory Complications\\") and allow us to determine if the use of oxygen at 80% FIO2 is associated with more respiratory complications.", "safety_issue": "Yes"}]
ceaedb02971c478aa16f9b745b15b102	nct	NCT01508208	{"others": null}	2012-01-08	Comparison of Urine Protein/Creatinine Ratio With 24-hour Urine Protein Excretion in Woman With Hypertensive Disorders	The presence of proteinuria (>300 mg/d) represents an important factor in the diagnosis and\n      evaluation of the pregnant patient with an hypertensive disorder. The 24 hour collection of\n      urine for proteinuria is the gold standard for the diagnosis of the condition and allows the\n      physician to determine if an hypertensive disorder is related directly or not to the\n      gestation.\n\n      The problem is the time it takes and the technical difficulties related to the sample\n      collection. An alternative is the quantification of protein and creatinine in a random\n      sample of urine. We seek to evaluate if this method is as affective as the gold standard in\n      the diagnosis of proteinuria (>300 mg/d).	A Comparison of Spot Test (Urine Protein/Creatinine Ratio) With 24 - Hour Urine Protein Excretion in Woman With Hypertensive Disorders of Pregnancy	\N	Recruiting	{"gender": "Female", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Pregnant women with 28 weeks or more of gestation.\\n\\n          -  Complete collection of the 24 hour urine sample.\\n\\n        Exclusion Criteria:\\n\\n          -  Failure to recollect the 24 hour urine sample.\\n\\n          -  Pregestational Diabetes\\n\\n          -  Kidney disease\\n\\n          -  24 hour urine protein > 8.0 g/dL or seric creatinine > 2.0 mg/dL (it could indicate\\n             kidney disease)."}, "maximum_age": "N/A", "minimum_age": "N/A", "healthy_volunteers": "No"}	420	2012-03-01	Interventional	Intervention Model: Single Group Assignment, Masking: Open Label, Primary Purpose: Diagnostic	N/A	[{"measure": "Sensitivity and Specificity", "time_frame": "Six months", "description": "The number of patients with a 24 hour urine collection with a proteinuria > 300mg will be compared with the number of patients with a Spot Test (protein/creatinine ratio in a random urine sample) > 0.2 (equivalent to the 24 hour test > 300 mg). This value will be used to calculate the Sensitivity and Specificity of the spot test.", "safety_issue": "No"}]	[{"measure": "Positive and Negative Predictive Value", "time_frame": "six months", "description": "The number of patients with a 24 hour urine collection with a proteinuria > 300mg will be compared with the number of patients with a Spot Test (protein/creatinine ratio in a random urine sample) > 0.2 (equivalent to the 24 hour test > 300 mg). This value will be used to calculate the positive and negative predective value of the spot test.", "safety_issue": "No"}]
b00153a39c094953bba31fbf66441621	nct	NCT01567254	{"others": null}	2012-02-01	The Effect of Guided Imagery in Children With Type 1 Diabetes Mellitus on Glucose Levels and on Glycemic Control	Background: Pediatric patients with type 1 diabetes mellitus are known to be a challenging\n      group for achieving recommended glycemic control. Coping with the demands of self-managing\n      IDDM in children and adolescents can be a formidable task, requiring a healthy and balanced\n      diet, monitoring and regular insulin injections. Most patients are non-compliant to the\n      treatment. A number of controlled studies have examined the efficiency of psychosocial\n      interventions for improving compliance and glycemic control among diabetic youth. None has\n      examined the effectiveness of guided imagery in treatment of type 1 diabetes mellitus.\n\n      Primary Objective: To asses simultaneously the effect of listening to auditory guided\n      imagery and blood glucose variability, compared to variability in blood glucose while\n      listening to songs.\n\n      Secondary Objective To assess the effect of routine auditory guided imagery to glycemic\n      control and quality of life in children with type 1 diabetes mellitus, compared to listening\n      listening to songs.\n\n      Methods:\n\n      Subjects: 14 youth ages 7-16 years with type 1 diabetes mellitus , for at least 6 months,\n      and not during the honey moon period will be recruited, and will be blindly randomized to\n      receive intervention (auditory guided imagery group) or control (regular auditory music).\n\n      Protocol:\n\n      Design: A randomized Controlled Blinded Study Intervention: 14 randomly numbered CD's will\n      be prepared at study initiation, half containing auditory guided imagery and half containing\n      music.\n\n      Study protocol: After an initial check up, including HbA1C levels, and explanation of study\n      procedures the participants will be given either the intervention or the control CD, to be\n      used twice a day for five days. During this period continuous glucose monitoring will be\n      performed. On days one and five the procedure will take place while the participants are\n      connected to biofeedback. QOL questionnaires will be completed at the beginning of day one,\n      or before.\n\n      In the second part of the study the children will use the intervention / control CD at home\n      twice a week for 12 weeks. At the end of the study period they will again be evaluated,\n      including HbA1C, and all subjects will again complete QOL questionnaires	Subject: A Blinded Randomized Trial: the Effect of Guided Imagery in Children With Type 1 Diabetes Mellitus on Glucose Levels and on Glycemic Control	14 participants will be assigned research numbers in a consecutive recruitment\n      order.(01-14).\n\n      14 auditory disks will be prepared ahead of study initiation, 7 with the guided imagery\n      program and 7 with regular songs.\n\n      All will look similar from the outside. The disks will be numbered 01-14. Disks numbering\n      will be performed by an investigator who is not part of treatment team, without knowing\n      which disk contains which content. So that the team and participants are blinded to the disk\n      content at initiation.\n\n      Children and parents will be aware of the type of auditory disk after initial auscultation\n      at visit number 1.\n\n      The team will continue to be blinded to type of disk until end of study. 3. All participants\n      will be aware at study initiation that they may receive the auditory guided imagery disk or\n      a regular songs / story auditory disk.\n\n      4. Visit no. 1:\n\n        1. Will be arranged on date of their regular clinic visit\n\n        2. Guidance to disk usage\n\n        3. Biofeedback for autonomic parameters assessment\n\n        4. Participants will be connected to the continuous glucose monitoring system (A system\n           which the patient is blinded to glucose readings).\n\n        5. Participants and parents will fill QOL questionnaire [The Diabetes Treatment\n           Satisfaction Questionnaire (DTSQ) by Bradley C. et Al (16)], if not filled before.\n\n        6. Participants will listen to disk for the first time in clinic, alone in a room with the\n           parent\n\n        7. At this stage participants will be aware of the group they are in (treatment vs.\n           control), but team is still unaware.\n\n        8. Participants will be able to come with brothers and parents and recreational activity\n           will be available at site for all for entertainment 5. Visit no. 2-5: 6. Participants\n           will listen to disk twice a day for the next four days alone in a room in our clinic.\n           They will be able to come with brothers and parents, and recreational activity will be\n           available at site for all for entertainment.\n\n           7. 5th day visit:\n\n      a. Participants will listen to disk for the last times in clinic, alone in a room.\n\n      b. Participants will be disconnected from CGMS c. Biofeedback for autonomic parameters\n      assessment 8. Participants will listen to disk at least twice a week, for additional 11\n      weeks, at their choice of time and day, and will record the specific time of listening on\n      study chart 9. Visit no. 6:\n\n        1. Will be arranged on date of their regular clinic visit (12-14 weeks after visit no. 1)\n\n        2. Biofeedback for autonomic parameters assessment\n\n        3. Participants and parents will fill QOL questionnaires (The Diabetes Treatment\n           Satisfaction Questionnaire (DTSQ) by Bradley C. et Al (16)\n\n        4. End of study 10. Data will be collected from charts from dates of visit no. 1 and visit\n           no. 3 regarding: weight, height, BMI, 14 days average blood glucose levels, HbA1c.	Completed	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Type 1 diabetes mellitus for longer than 6 months\\n\\n          -  Insulin requirements of more than 0.4 units/kg/day for at least 3 months\\n\\n          -  Age 7-16 years\\n\\n          -  Agreement of parents or guardian to participate in the study\\n\\n          -  Agreement and wiliness of child to participate in the study\\n\\n        Exclusion Criteria:\\n\\n          -  Children with cognitive impairment which prevents them from using guided imagery\\n\\n          -  Unable to understand Hebrew\\n\\n          -  Hearing defect\\n\\n          -  Attention deficit disorder"}, "maximum_age": "16 Years", "minimum_age": "7 Years", "healthy_volunteers": "No"}	\N	2012-04-01	Interventional	Allocation: Randomized, Endpoint Classification: Efficacy Study, Intervention Model: Parallel Assignment, Masking: Single Blind (Investigator), Primary Purpose: Supportive Care	N/A	[{"measure": "Blood glucose values before and after listening to the recording.", "time_frame": "1 week", "description": "Blood glucose variability of teenagers before and after listening to auditory guided imagery, compared to the blood glucose variability of teenagers before and after listening to music. The blood glucose values will be measured by continuous glucose monitoring system (CGMS).", "safety_issue": "No"}]	[{"measure": "The delta of HA1C between before and after three months of periodic listening to auditory guided imagery, compared to listening to music.", "time_frame": "3 months", "description": "Average of deltas of HA1C between before and after three months of peridic listening to auditory guided imagery, compared to listening to music.", "safety_issue": "No"}]
442a08b9147a4a4db549a48acb7708f4	nct	NCT01988519	{"others": null}	2013-11-13	Drains in Pancreatic Surgery	Pancreatic resection is the only potentially curative modality of treatment for pancreatic\n      neoplasm. The mortality associated with this procedure decreased rapidly in the past\n      decades. However, the morbidity associated with pancreatic resection remains high. The main\n      reason for postoperative morbidity is postoperative pancreatic fistula (POPF), which is\n      regarded as the most ominous complication following pancreatic resection. Its reported\n      incidence varies in the surgical literature from 10% to >30%.\n\n      Recently published studies showed that the placement of intraoperative drains, manipulation\n      with the drains, timing of removal of the drain, and especially the type of drain, have\n      significant effect on the postoperative complications, and especially POPF.\n\n      Controversy exists regarding the type of intraoperatively placed drain. Nowadays, the two\n      most commonly used systems are closed suction drainage and closed gravity drainage. Open\n      systems have been abandoned in most centers as they are obsolete.\n\n      Our hypothesis is that the closed suction drain will have better results as it is more\n      effective than the gravity drainage. However, some surgeons claim that the suction system\n      can actively suck the pancreatic juice through the anastomosis or suture and thus promote\n      the development of POPF.\n\n      The aim of this study is to compare closed suction drains and closed gravity drains after\n      pancreatic resection in a randomized controlled study.\n\n      The primary end-point is the postoperative pancreatic fistula rate. The secondary end-point\n      is the postoperative morbidity.	Does the Type of Drain Influence the Postoperative Pancreatic Fistula Rate After Pancreatic Resection?	Pancreatic resection is the only potentially curative modality of treatment for pancreatic\n      neoplasm. The mortality associated with this procedure decreased rapidly in the past\n      decades. However, the morbidity associated with pancreatic resection remains high. The main\n      reason for postoperative morbidity is postoperative pancreatic fistula, which is regarded as\n      the most ominous complication following pancreatic resection. Its reported incidence varies\n      in the surgical literature from 10% to >30%.\n\n      Recently published studies showed that the placement of intraoperative drains, manipulation\n      with the drains, timing of removal of the drain, and especially the type of drain, have\n      significant effect on the postoperative complications, and especially POPF.\n\n      Even though several trials showed that the routine use of intraoperatively placed drains in\n      elective pancreatectomy does not reduce postoperative morbidity, most of the high-volume\n      pancreatic surgery centers still place the drains routinely. The theoretical advantage of\n      drainage is to identify an early bile or pancreatic leak, or postoperative hemorrhage; and\n      therefore allow for early treatment of the complication; or in some cases, the drain would\n      control the leak without necessity of reintervention.\n\n      Two large studies compared early versus late removal of the intraoperatively placed drains.\n      The first published by Kawai et al. was a cohort study, including 104 patients. The second\n      one published by Bassi et al. was prospective randomized trial including 114 patients. Both\n      studies clearly showed that the group of patients with early drain removal has superior\n      results, lower rate of POPF and lower morbidity.\n\n      Controversy exists regarding the type of intraoperatively placed drain. The surgeons in the\n      USA usually use the closed suction drainage system. On the other hand, European and Asian\n      surgeons usually prefer open Penrose system, closed gravity drainage, or a combination of\n      both. The closed suction drainage system uses slight under pressure to drain the fluid from\n      the abdominal cavity. It is more effective than other systems, and thus advantageous.\n      However, some surgeons claim that the suction system can actively suck the pancreatic juice\n      through the anastomosis or suture and thus promote the development of POPF.\n\n      Only one study published by Schmidt et al. compared closed suction drainage system with\n      gravity drainage. However, this study collected results over a very long period, and the\n      comparison of the drains was not primary end-point of the study. Randomized controlled\n      trials comparing various drains were published in cardiac surgery.\n\n      The situation in pancreatic surgery is specific. The pancreatic anastomosis or suture line\n      is not water-tight in large proportion of cases. It is due to the character of pancreatic\n      parenchyma. Especially in soft pancreas, the stitches can cut through and cause leak of the\n      suture line or anastomosis. Therefore, pancreatic leak is not rare after pancreatic\n      resections. Most of the POPF are grade A according to the ISGPF classification; with no\n      clinical consequences. The aim of the postoperative management should prevent the POPF\n      become clinically more severe (grade B and C). And the manipulation with the drains, and\n      especially the type of drain, seem to play a major role.	Recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  pancreaticoduodenectomy\\n\\n          -  distal pancreatectomy\\n\\n        Exclusion Criteria:\\n\\n          -  central pancreatectomy\\n\\n          -  total pancreatectomy\\n\\n          -  enucleation\\n\\n          -  laparoscopic procedure\\n\\n          -  resection and reconstruction of portal vein"}, "maximum_age": "N/A", "minimum_age": "18 Years", "healthy_volunteers": "No"}	220	2013-10-01	Interventional	Allocation: Randomized, Endpoint Classification: Efficacy Study, Intervention Model: Parallel Assignment, Masking: Open Label, Primary Purpose: Treatment	N/A	[{"measure": "Postoperative pancreatic fistula", "time_frame": "30 days postoperatively", "description": "Postoperative pancreatic fistula defined according to the ISGPF (International Study Group for Pancreatic Fistula)", "safety_issue": "Yes"}]	[{"measure": "Postoperative morbidity", "time_frame": "30 days postoperatively", "safety_issue": "Yes"}]
61722e86e4914bbeb905f135146a904f	nct	NCT01495923	{"others": null}	2011-12-15	Steroids Versus Gabapentin	The purpose of this study is to determine whether pharmacotherapy or epidural steroid\n      injections are a better treatment for lumbosacral radicular pain.\n\n      142 patients referred to a participating pain clinic with lumbosacral radiculopathy will be\n      randomized in a 1:1 ratio to receive one of two treatments. Half (n=71) of the patients will\n      be allocated to receive an epidural steroid injection (ESI; group I), with an equal number\n      allocated to receive gabapentin (group II). Patients & evaluating physicians will be\n      blinded. Follow-up will be through 3-months after treatment.	Randomized, Double-blind, Comparative-effectiveness Study Comparing Epidural Steroid Injections to Gabapentin in Patients With Lumbosacral Radiculopathy	142 patients referred to a participating pain clinic with lumbosacral radiculopathy will be\n      randomized in a 1:1 ratio to receive one of two treatments. Half (n=71) of the patients will\n      be allocated to receive an ESI (group I), with an equal number allocated to receive\n      gabapentin (group II).\n\n      Group I patients with unilateral symptoms will receive (unilateral) transforaminal ESI,\n      while those with bilateral symptoms will receive (central) interlaminar ESI, as is common\n      practice.\n\n      In group II patients who receive gabapentin, the dose will be titrated to between 1800 mg/d\n      and 2700 mg/d in TID dosing, but may be lowered or elevated (up to 3600 mg/d) depending on\n      the clinical circumstances. To ensure blinding, these patients will also receive midline\n      (for patients with bilateral symptoms who would receive interlaminar ESI) or unilateral\n      paraspinal (for patients with unilateral symptoms who would receive transforaminal ESI)\n      normal saline into the interspinal ligaments or paraspinal musculature, respectively.\n      Injections and medication titration will commence on the same day.\n\n      Rescue medications will consist of tramadol 50 mg 1 to 2 tablets every 6 hours PRN (up to\n      8/d) and/or ibuprofen 400-800 mg every 6 hours PRN (not-to-exceed 3000 mg/d). Patients\n      already taking analgesics, including opioids, can continue on these medications "as needed".\n\n      The first follow-up visit will be scheduled 1-month from the start of treatment. A positive\n      outcome will be defined as a > 2-point decrease in leg pain coupled with a positive\n      satisfaction rating. Subjects who obtain a positive outcome at their initial 1-month\n      follow-up visit will remain in the study and return for the final 3-month follow-up visit.\n      Those with a negative outcome will exit the study "per protocol" to receive standard care,\n      which may consist of unblinded ESI, medical management with drugs such as gabapentin (for\n      those who did not receive gabapentin) and antidepressants, and physical therapy. Subjects\n      who obtain a positive outcome at 1-month but experience a recurrence before their 3-month\n      follow-up visit will also exit the study per protocol, with their final outcome measures\n      recorded before they receive standard care. At all follow-up visits, pill counts will be\n      conducted to determine medication compliance.	Completed	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Lumbosacral radicular pain based on history and physical exam (e.g. pain radiating\\n             into one or both lower extremities, sensory loss, muscle weakness, positive straight\\n             leg raising test etc.)\\n\\n          -  Numerical Rating Scale leg pain score > 4 (or if 3/10, greater or equal to back pain)\\n\\n          -  MRI evidence of spinal pathology consistent with symptoms\\n\\n        Exclusion Criteria:\\n\\n          -  Untreated coagulopathy\\n\\n          -  Previous spine surgery\\n\\n          -  No MRI study\\n\\n          -  Leg pain > 4 years duration Epidural steroid injection within past 3 years Cauda\\n             equina syndrome Previous failed trials with gabapentin or pregabalin Allergic\\n             reactions to gabapentin or pregabalin Referrals from surgery for diagnostic\\n             injections for surgical evaluation Serious medical or psychiatric that condition that\\n             might preclude optimal outcome or interfere with participation, such as the need for\\n             uninterrupted anticoagulation.\\n\\n        Pregnancy"}, "maximum_age": "N/A", "minimum_age": "17 Years", "healthy_volunteers": "No"}	\N	2011-12-01	Interventional	Allocation: Randomized, Endpoint Classification: Efficacy Study, Intervention Model: Parallel Assignment, Masking: Double Blind (Subject, Investigator, Outcomes Assessor), Primary Purpose: Treatment	N/A	[{"measure": "leg pain", "time_frame": "1 month", "safety_issue": "No"}, {"measure": "leg pain", "time_frame": "3 months", "safety_issue": "No"}]	[{"measure": "Back pain", "time_frame": "1 month", "safety_issue": "No"}, {"measure": "Back pain", "time_frame": "3 months", "safety_issue": "No"}, {"measure": "Oswestry disability index", "time_frame": "1 month", "description": "functional capacity", "safety_issue": "No"}, {"measure": "Oswestry disability index", "time_frame": "3 months", "description": "functional capacity", "safety_issue": "No"}, {"measure": "satisfaction", "time_frame": "1 month", "description": "Question: Are you satisfied with the results of your treatment?", "safety_issue": "No"}, {"measure": "satisfaction", "time_frame": "3 months", "description": "Question: Are you satisfied with the results of your treatment?", "safety_issue": "No"}]
ebd88f3f3e4b46328a6b786307c41521	nct	NCT01538121	{"others": null}	2012-02-19	Antiphospholipid Antibodies and Early Severe Preeclampsia.	The Antiphospholipid Syndrome is an immune disease where the presence of antibodies directed\n      against cell membrane phospholipids (antiphospholipid antibodies) can cause an\n      hypercoagulable state that causes thrombosis and obstetric complications (miscarriages,\n      stillbirths). Since 1999 the Sapporo Criteria for Antiphospholipid Syndrome diagnosis\n      includes the development of severe preeclampsia before 34 weeks of gestation, but this was\n      done without solid evidence of a relation between the two. Our study will try to add\n      information to this particular point.	Antiphospholipid Antibodies and Early Severe Preeclampsia (< 34 Weeks of Gestation). A Case-Control Study.	\N	Not yet recruiting	{"gender": "Female", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Gestational age between 24-34 weeks\\n\\n          -  Diagnosis of severe preeclampsia\\n\\n        Exclusion Criteria:\\n\\n          -  Known antiphospholipid syndrome.\\n\\n          -  Known presence of antiphospholipid antibodies.\\n\\n          -  Patients with systemic lupus erythematosus."}, "study_pop": {"textblock": "Pregnant patients admitted for severe preeclampsia between 24-34 weeks pf gestation\\n        (cases) and normal patients in labor at term (controls)."}, "maximum_age": "N/A", "minimum_age": "N/A", "sampling_method": "Non-Probability Sample", "healthy_volunteers": "No"}	310	2015-06-01	Observational	Observational Model: Case Control, Time Perspective: Prospective	N/A	[{"measure": "Lupus anticoagulant", "time_frame": "15 months", "description": "Number of cases positive for Lupus Anticoagulant.", "safety_issue": "No"}, {"measure": "Anticardiolipin antibodies", "time_frame": "15 months", "description": "Number of cases with high/medium levels of IgG/IgM of anticardiolipin antibodies.", "safety_issue": "No"}, {"measure": "B2 Glycoprotein I", "time_frame": "15 months", "description": "Number of cases with levels of B2 Glycoprotein 1 > 99%", "safety_issue": "No"}]	[]
c881db91c82a4e1eb6466d0dbf4ca8ed	nct	NCT01538134	{"others": null}	2012-02-19	Antiphospholipid Antibodies and Fetal Growth Restriction	The Antiphospholipid Syndrome is an immune disease where the presence of antibodies directed\n      against cell membrane phospholipids (antiphospholipid antibodies) can cause an\n      hypercoagulable state that causes thrombosis and obstetric complications (miscarriages,\n      stillbirths). Since 1999 the Sapporo Criteria for Antiphospholipid Syndrome diagnosis\n      includes the development of fetal growth restriction (diagnosed postpartum), but this was\n      done without solid evidence of a relation between the two or using the most common form of\n      fetal growth restriction diagnosis (ultrasound). Our study will try to add information to\n      this particular point.	Antiphospholipid Antibodies and Early Fetal Growth Restriction (<34 Weeks of Gestation). A Case Control Study.	\N	Not yet recruiting	{"gender": "Female", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Gestational age between 24-34 weeks.\\n\\n          -  Ultrasonographic evidence of fetal growth restriction\\n\\n               -  Abdominal circumference < 3rd percentile.\\n\\n               -  Doppler with increase of placental resistance.\\n\\n        Exclusion Criteria:\\n\\n          -  Known antiphospholipid syndrome.\\n\\n          -  Known presence of antiphospholipid antibodies.\\n\\n          -  Patients with systemic lupus erythematosus."}, "study_pop": {"textblock": "Pregnant patients admitted for fetal growth restriction (cases) and normal patients in\\n        labor at term (controls)."}, "maximum_age": "N/A", "minimum_age": "N/A", "sampling_method": "Non-Probability Sample", "healthy_volunteers": "No"}	90	2015-06-01	Observational	Observational Model: Case Control, Time Perspective: Prospective	N/A	[{"measure": "Lupus anticoagulant", "time_frame": "8 months", "description": "Number of cases positive for Lupus Anticoagulant.", "safety_issue": "No"}, {"measure": "Anticardiolipin antibodies", "time_frame": "10 months", "description": "Number of cases with high/medium levels of IgG/IgM of anticardiolipin antibodies.", "safety_issue": "No"}, {"measure": "B2 Glycoprotein I", "time_frame": "10 months", "description": "Number of cases with levels of B2 Glycoprotein I > 99%", "safety_issue": "No"}]	[]
ac5ccbaf949f4353bfd7b8d7cbbb70fc	nct	NCT01538147	{"others": null}	2012-02-19	Restless Leg Syndrome and Severe Preeclampsia	Restless Leg Syndrome is a common but not well recognized central nervous system disorder.\n      It is more prevalent during pregnancy and, if present before pregnancy, can develop an\n      exacerbation of symptoms. In some of the hypothesis trying to explain this syndrome, the\n      physiopathology can also explain hypertensive disorders of pregnancy. So far, no study has\n      been done trying to link both disorders.	Association Between Restless Leg Syndrome and Severe Preeclampsia. A Case Control Study.	\N	Recruiting	{"gender": "Female", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Gestational age between 24-34 weeks\\n\\n          -  Severe preeclampsia\\n\\n        Exclusion Criteria:\\n\\n          -  Neurological disorders (central nervous system)"}, "study_pop": {"textblock": "Pregnant patients with severe preeclampsia (cases) and normal pregnancies at term\\n        (control)."}, "maximum_age": "N/A", "minimum_age": "N/A", "sampling_method": "Non-Probability Sample", "healthy_volunteers": "No"}	310	2014-08-01	Observational	Observational Model: Case Control, Time Perspective: Prospective	N/A	[{"measure": "Restless Leg Syndrome", "time_frame": "10 months", "description": "Number of patients with criteris for the diagnosis of Restless Leg Syndrome", "safety_issue": "No"}]	[]
1a54f4e1103445b882ca69869c6eda02	nct	NCT00592891	{"others": null}	2008-01-02	Oxygen Toxicity of HBOT in Chronic Brain Injury	Hypothesis: That HBOT can be toxic in the low-pressure range.	Oxygen Toxicity Effects Using Los-Pressure Hyperbaric Oxygen Therapy in the Treatment of Chronic Brain Injury	The study is a retrospective review of the author's experience treating chronic brain injury\n      with HBOT, supplemented by cases communicated to the author, who developed untoward effects\n      during or after their HBOT. The object of the study was to affirm or refute the author's\n      general impression that there was an optimal dose of HBOT in chronic brain injury which was\n      lower than the traditional dose applied in chronic non-central nervous system wounding.\n      Furthermore, when this lower dosage range was exceeded and approached the traditional doses\n      for non-CNS wounding oxygen toxicity would result. To address these impressions the study\n      seeks to review the author's medical records and other patient/doctor communications to the\n      author where side effects of HBOT occurred in the treatment of chronic brain injury and\n      abstract signs, symptoms, and the dose of HBOT employed.	Recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Cerebral disorder of greater than one year's duration\\n\\n        Exclusion Criteria:"}, "maximum_age": "N/A", "minimum_age": "N/A", "healthy_volunteers": "No"}	45	2002-04-01	Interventional	Endpoint Classification: Safety Study, Intervention Model: Single Group Assignment, Masking: Open Label, Primary Purpose: Treatment	Phase 1	[{"measure": "Oxygen toxicity", "time_frame": "After completion of hyperbaric oxygen therapy", "safety_issue": "Yes"}]	[]
74d612a1e139412c8d678a45dd735bae	nct	NCT02276469	{"others": ["Psychenet Teilprojekt 5"]}	2014-10-09	Peer Support for Severe Mental Disorders	The purpose of this study is to determine wether peer support is effective for the treatment\n      of people with severe mental illness.	Randomized Controlled Trial of Peer to Peer Support for People With Severe Mental Disorders: Schizophrenia, Affective Disorders and Personality Disorders in Comparison to Standard Care	A randomized controlled multi center trial is conducted, where patients receive usual care\n      in the control group and usual care with additional peer support for 6 month in the\n      intervention group. Psychosocial outcome criteria are collected pre intervention, after 6\n      month intervention and at one year follow up. Days till hospitalization and days spent in\n      hospital are collected for one year before recruitment and one year after recruitment.	Completed	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  clinical diagnosis of schizophrenia, unipolar depression, bipolar disorder,\\n             personality disorder\\n\\n        Exclusion Criteria:\\n\\n          -  primary clinical diagnosis of addiction"}, "maximum_age": "N/A", "minimum_age": "17 Years", "healthy_volunteers": "No"}	\N	2011-07-01	Interventional	Allocation: Randomized, Endpoint Classification: Efficacy Study, Intervention Model: Parallel Assignment, Masking: Open Label, Primary Purpose: Treatment	N/A	[{"measure": "Change from Baseline in Self-Efficacy at 6 month", "time_frame": "1. Baseline; 6 month follow up (post intervention); twelve month follow", "description": "General Self-Efficacy Scale; Self report Questionnaire; 10 Items", "safety_issue": "No"}]	[{"measure": "Change from Baseline in Quality of life at 6 and 12 month", "time_frame": "1. Baseline; 2. Six month follow up (post intervention) 3. Twelve month follow", "description": "Self report questionnaires: Modulares System zur Lebensqualität MSLQ-R", "safety_issue": "No"}, {"measure": "Change from Baseline in Quality of life at 6 and 12 month", "time_frame": "1. Baseline; 2. Six month follow up (post intervention) 3. Twelve month follow", "description": "Self report questionnaires: EuroQol-Group: EQ5D", "safety_issue": "No"}, {"measure": "Service satisfaction after six month of intervention", "time_frame": "After six month intervention", "description": "Self report questionnaire: Client Satisfaction Questionnaire CSQ 8", "safety_issue": "No"}, {"measure": "Change from Baseline in Illness management, Coping at 6 and 12 month", "time_frame": "1. Baseline; 2. Six month follow up (post intervention) 3. Twelve month follow", "description": "FKV-LIS Freiburger Self report questionnaire: Fragebogen zur Krankheitsverarbeitung; examining coping strategies", "safety_issue": "No"}, {"measure": "Change from Baseline in Psychosocial functioning at 6 and 12 month", "time_frame": "1. Baseline; 2. Six month follow up (post intervention) 3. Twelve month follow", "description": "Clinical observation: Global assessment of functioning DSM", "safety_issue": "No"}, {"measure": "Change from Baseline in Severity of illness at 6 and 12 month", "time_frame": "1. Baseline; 2. Six month follow up (post intervention) 3. Twelve month follow", "description": "Clinical observation: Clinical global impression", "safety_issue": "No"}, {"measure": "Change from Baseline in Illness management, Coping at 6 and 12 month", "time_frame": "1. Baseline; 2. Six month follow up (post intervention) 3. Twelve month follow", "description": "Self report questionnaire: Subjective sense of psychosis", "safety_issue": "No"}, {"measure": "Hospitalization in days of in-patient care", "time_frame": "one year before, until one year past intervention", "description": "The days of in patient care assessed from the clinical records", "safety_issue": "No"}, {"measure": "Days to hospitalization", "time_frame": "Baseline until 12 month follow up", "description": "Days to hospitalization after the beginning of treatment assessed from the clinical records", "safety_issue": "No"}]
25d6cb4e3db1409aaeb6b8779e873f27	nct	NCT02332304	{"others": null}	2015-01-04	Amniotic Fluid Optical Density Determination as a Test for Assessment of Fetal Lung Maturity.	To determine the relationship between the result of amniotic fluid optical density between\n      26 and 36 6/7 weeks of pregnancy and the risk of developing neonatal respiratory distress\n      syndrome.	Amniotic Fluid Optical Density Determination Between 28 and 36 6/7 Weeks of Pregnancy and Its Relationship With the Diagnosis of Neonatal Respiratory Distress Syndrome.	\N	Completed	{"gender": "Female", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Pregnancy between 26 and 36 6/7 weeks.\\n\\n        Exclusion Criteria:\\n\\n          -  Problems in the handling of the amniotic fluid sample that prevented the calculation\\n             of the optical density."}, "maximum_age": "N/A", "minimum_age": "N/A", "healthy_volunteers": "No"}	\N	2014-05-01	Interventional	Endpoint Classification: Efficacy Study, Intervention Model: Single Group Assignment, Masking: Open Label, Primary Purpose: Diagnostic	Phase 3	[{"measure": "Respiratory Distress Syndrome, Newborn", "time_frame": "1 month", "description": "Diagnosis of Respiratory Distress Syndrome in the neonatal period. The diagnosis was made by the neonatologist in charge (using clinical and radiological parameters).", "safety_issue": "No"}]	[]
cee9487fc21545d38a9bce118c3ab8f4	nct	NCT02332369	{"others": null}	2015-01-05	EyeKon Medical Inc. CTR Study	This study evaluates the safety and effectiveness of a capsular tension ring (CTR) when used\n      during cataract surgery. Capsular Tension Rings are used during intraocular lens\n      implantation to give added support in order to keep the intraocular lens well centered,\n      especially in eyes with weak or partially absent zonules. In many cases, capsular tension\n      rings allow a lens to be successfully implanted into an eye which otherwise could not have\n      supported an intraocular lens, and have enabled patients to regain normal activities again\n      after cataract surgery.	EyeKon Medical, Inc. Capsular Tension Ring Clinical Study	The clinical study of the CTR-10 and CTR-12 Capsular Tension Rings is to be conducted with\n      the following objectives:\n\n        1. Determine the ability of the device to maintain the shape of the capsular bag and\n           therefore keep the intraocular lens centered;\n\n        2. Determine post-operative visual acuity of patients receiving the capsular tension ring\n           as a secondary method of determining the efficacy;\n\n        3. Describe the occurrence and time course of postoperative complications and adverse\n           reactions for capsular tension ring implant subjects;\n\n        4. Describe the occurrence of postoperative complications for the implant group and their\n           relationship to ocular complications.\n\n        5. Identify groups within the implant study population that are at "high risk" of\n           particular complications.\n\n        6. Collect and analyze against those historical controls published by FDA data on:\n\n             1. Overall Visual Acuity\n\n             2. Best Case Visual Acuity\n\n             3. Cumulative Hyphema\n\n             4. Cumulative Macular Edema\n\n             5. Cumulative Retinal Detachment\n\n             6. Cumulative Pupillary Block\n\n             7. Cumulative Lens Dislocation\n\n             8. Cumulative Endophthalmitis\n\n             9. Cumulative Hypopyon\n\n            10. Cumulative Surgical Reintervention\n\n            11. Persistent Macular Edema\n\n            12. Persistent Corneal Edema\n\n            13. Persistent Iritis\n\n            14. Persistent Raised IOP Requiring treatment\n\n            15. Frequency and degree of posterior capsule opacification\n\n      The investigational plan for the clinical study of capsular tension rings is designed to\n      satisfy the requirements of the Investigational Device Exemption (IDE) regulations, which\n      require a well-controlled clinical trial with ongoing monitoring to evaluate the safety and\n      efficacy of the intraocular lenses.\n\n      The study will consist of adult patients who will be enrolled into the study. The results of\n      these implants will be carefully monitored for approximately twelve (12) months.	Active, not recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  The patient is in good general and ocular health, having a vision-reducing cataract\\n             in the intended operative eye.\\n\\n          -  The intended operative eye has a Snellen best corrected visual of 20/40 or worse for\\n             distance or the refraction worsens to this level with glare testing.\\n\\n          -  The patients' worse seeing Eye is 20/70 or better.\\n\\n          -  The patient is willing and able to complete all required postoperative visits.\\n\\n          -  The patient is willing to sign a statement of informed consent.\\n\\n          -  The patient is at least 21 years old.\\n\\n          -  The patient requires cataract surgery with IOL implantation.\\n\\n          -  The patient has observed or suspected weakened, torn, missing or otherwise\\n             compromised zonules (torn or missing estimated not to exceed one-third of the\\n             capsular bag diameter) due to Pseudoexfoliation Syndrome, Marfans Syndrome, trauma or\\n             other zonular compromising condition.\\n\\n          -  The capsule is intact during insertion.\\n\\n        Exclusion Criteria:\\n\\n          -  Only one functional eye\\n\\n          -  Capsular bag tearing beyond the point where the surgeon thinks it is in the best\\n             interest of the patient to have a capsular ring implanted\\n\\n          -  Significant zonular didlysis during surgery\\n\\n          -  Preoperative ocular infection\\n\\n          -  Ocular inflammation or uveitis\\n\\n          -  Amblyopia\\n\\n          -  Aniridia\\n\\n          -  Congenital cataracts\\n\\n          -  Cataracts due to rubella\\n\\n          -  Corneal disease\\n\\n          -  Diabetes\\n\\n          -  Preoperative intraocular pressure over 21 mm Hg\\n\\n          -  Iritis\\n\\n          -  Iris atrophy\\n\\n          -  Pseudophakic lens exchange\\n\\n          -  Microphthalmia\\n\\n          -  Optic atrophy\\n\\n          -  Macular degeneration\\n\\n          -  Retinal detachment\\n\\n          -  Retinal degeneration\\n\\n          -  Vitritis\\n\\n          -  Flat anterior chamber\\n\\n          -  Other conditions as noted by the surgeon which may compromise the safety of the\\n             patient or the accuracy of the study"}, "maximum_age": "N/A", "minimum_age": "18 Years", "healthy_volunteers": "No"}	125	2005-02-01	Interventional	Endpoint Classification: Safety/Efficacy Study, Intervention Model: Single Group Assignment, Masking: Open Label, Primary Purpose: Treatment	N/A	[{"measure": "Visual Acuity", "time_frame": "At all pre/post op CFR's for 2 years", "safety_issue": "Yes"}]	[{"measure": "Adverse Events", "time_frame": "2 Years", "safety_issue": "Yes"}]
44e8a55bbd884df789c47b8d4146508b	nct	NCT02331797	{"others": null}	2014-12-26	Endoscopic Transcanal Lateral Graft Tympanoplasty	Minimally invasive surgery is becoming more common in many surgical fields. The wide view of\n      endoscope allows for minimally invasive transcanal approach instead of large postauricular\n      opening. The investigators conduct this study to compared post operative pain score (by\n      Visual Analogue Scales) between conventional microscope lateral placing tympanoplasty and\n      endoscopic lateral placing tympanoplasty.	Endoscopic Transcanal Lateral Graft Tympanoplasty: a Minimally Invasive Otologic Surgery	A main part of tympanoplasty is repair of perforated tympanic membrane. There are two\n      popular way to approach tympanic membrane, transcanal or postauricular approach. There are\n      two grafting techniques are applied in tympanoplasty which includes the lateral technique\n      (overlay) and medial technique (underlay).\n\n      The lateral technique is widely used in our institute which involves placement of a graft\n      lateral to the tympanic annulus and the fibrous layer of the tympanic remnant. The most our\n      preferred approach in previous experience is the postauricular approach for tympanoplasty\n      because the transcanal approach is not enough for adequate exposure. Moreover, the\n      visualization straight through transcanal provide by the microscope is difficult by a\n      limited view of the perforation edge due to narrowing and curved external ear canal.\n      Postauricular approach cause many layers of tissue are violated along with a significant\n      postoperative pain.\n\n      The author proposed this study with the aim of determining the alleviation of postoperative\n      pain by new technique and the efficacy of endoscope for tympanoplasty.	Recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Age between 12-70 years\\n\\n          -  The patients who had perforation of tympanic membrane\\n\\n          -  The perforations are all dry at the time of surgery and have been dry for at least 3\\n             months.\\n\\n          -  No contraindication for local or general anesthesia.\\n\\n          -  No recent upper respiratory tract infection at least 2 weeks before surgery.\\n\\n          -  No unstable underlying condition.\\n\\n          -  Have at least 2 months of follow up.\\n\\n          -  Agree to participate in the study\\n\\n          -  Aaccept to be randomized to receive treatment\\n\\n          -  Willing to sign an informed consent\\n\\n        Exclusion Criteria:\\n\\n          -  Medial placing or inlay surgical technique\\n\\n          -  Chronic otitis media\\n\\n          -  Contraindication of vasoconstriction agent (adrenaline)\\n\\n          -  Allergy to analgesic agent (Xylocaine or Lidocaine)\\n\\n          -  Concomitant with mastoiditis.\\n\\n          -  Previous intracranial or extra-cranial complication of chronic otitis media.\\n\\n          -  Pregnancy"}, "maximum_age": "70 Years", "minimum_age": "12 Years", "healthy_volunteers": "No"}	21	2014-12-01	Interventional	Allocation: Randomized, Endpoint Classification: Safety/Efficacy Study, Intervention Model: Parallel Assignment, Masking: Open Label, Primary Purpose: Treatment	N/A	[{"measure": "Postoperative pain score, evaluated by Visual analogue scale.", "time_frame": "24 hour postoperative.", "description": "Evaluate pain score by Visual analogue scale. Patients are asked to score their pain on visual analogue scale at 4 hour, 24 hour and 48 hour postoperative.", "safety_issue": "No"}]	[{"measure": "Audiometric parameters", "time_frame": "20th week postoperative", "description": "Evaluated by audiometry (pure tone average of air and bone conduction, air-bone gap.)", "safety_issue": "No"}, {"measure": "The intactness of graft, evaluated by endoscopic visualization, and is catergorized as perforated or healed.", "time_frame": "20th week postoperative.", "description": "The intactness of graft is evaluated by endoscopic visualization, and is catergorized as perforated or healed.", "safety_issue": "No"}, {"measure": "Operative time", "time_frame": "Begining to the end of surgery", "description": "The actual operating time is recorded from beginning of local anesthetic injection to the end of the surgery (complete skin suturing).", "safety_issue": "No"}]
52e1e17626e349b0a3feb1c9776b2d6c	nct	NCT02333851	{"others": null}	2014-12-20	Basal-bolus and Premixed Insulin Regimens in Hospitalized Patients With Type 2 Diabetes (PININ Study)	Pilot study to compare the efficacy and safety of a premixed-insulin regimen (70%\n      intermediate insulin and 30% regular insulin) to a basal-bolus insulin regimen (glargine\n      once daily and glulisine before meals) hospitalized patients with type 2 diabetes.	Comparison of Basal-bolus and Premixed Insulin Regimens in Hospitalized Patients With Type 2 Diabetes (PININ Study)	Pilot, randomized, prospective, open-label study admitted to the Hospital with a previous\n      diagnosis of type 2 diabetes or with a blood glucose level on admission greater than 180\n      mg/dl.\n\n      Patients were randomized to receive a premixed human insulin formulation with 70%\n      intermediate insulin plus 30% regular insulin (Mixtard 30®, Novo Nordisk) or a basal-bolus\n      regimen with glargine once daily and glulisine before meals (Lantus® and Apidra®,\n      Sanofi-Aventis).\n\n      The primary outcome of the study was to determine differences in glycemic control between\n      treatment groups as measured by mean daily blood glucose concentration during the hospital\n      stay. Secondary objectives were to determine differences in the percentage of glucose\n      measures between 80 and 180 mg/dl, frequency and severity of hypoglycemic events, total\n      daily insulin use, length of hospital stay and glycemic viability between groups.	Terminated	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Previous diagnosis of type 2 diabetes with a blood glucose level on admission greater\\n             than 180 mg/dl and treated with diet, any combination of oral antidiabetics agents\\n             and/or insulin therapy\\n\\n        Exclusion Criteria:\\n\\n          -  Patients with hyperglycemia without a previous diagnosis of diabetes\\n\\n          -  Patients with acute hyperglycemic emergencies or with severe hyperglycemia treated\\n             with intravenous insulin infusion on admission\\n\\n          -  Patients with acute or chronic kidney disease (serum creatinine greater than 2\\n             mg/dl),\\n\\n          -  Patients treated with corticosteroids\\n\\n          -  Patients with history of severe or repeated hypoglycemic episodes\\n\\n          -  Pregnant women\\n\\n          -  Patients expected to require ICU admission or less than 3 days of hospital stay"}, "maximum_age": "N/A", "minimum_age": "18 Years", "healthy_volunteers": "No"}	\N	2013-06-01	Interventional	Allocation: Randomized, Endpoint Classification: Safety/Efficacy Study, Intervention Model: Parallel Assignment, Masking: Open Label, Primary Purpose: Treatment	Phase 4	[{"measure": "Differences in mean daily blood glucose concentration", "time_frame": "Participants will be followe for the duration of hospital stay, an expected average of 2 weeks", "description": "Glucose concentration were measured in capillary blood 6 times a day, before and 2 hours after meals and daily mean calculated", "safety_issue": "No"}]	[{"measure": "Number and severity of hypoglycemia episodes", "time_frame": "Participants will be followe for the duration of hospital stay, an expected average of 2 weeks", "description": "Frequency and severity of hypoglycemia episodes during all the stay in the hospital", "safety_issue": "Yes"}, {"measure": "Measures of dispersion of glycemia values (Glycemia variability)", "time_frame": "Participants will be followe for the duration of hospital stay, an expected average of 2 weeks", "description": "Glycemia variability will be measured by standard deviation of blood glucose values, coefficient of variation and mean amplitude of glycemic excursions or MAGE.", "safety_issue": "No"}, {"measure": "Total daily Insulin use in International Units per Kg of weight", "time_frame": "Participants will be followe for the duration of hospital stay, an expected average of 2 weeks", "safety_issue": "No"}]
e2abfff79c3547c7b6ae35733efa306a	nct	NCT02318342	{"others": null}	2014-12-04	Assessment of TRanscathetEr and Surgical Aortic BiOprosthetic Valve Thrombosis and Its TrEatment With Anticoagulation	This is a prospective study designed to evaluate the structural and functional integrity of\n      transcatheter or surgical bioprosthetic aortic valves with multimodality imaging (Phase 1).\n      The study further aims to confirm resolution of the early bioprosthetic valve thrombotic\n      changes with Vitamin K antagonists (warfarin) mediated anticoagulation therapy (Phase 2).	Assessment of TRanscathetEr and Surgical Aortic BiOprosthetic Valve Dysfunction With Multimodality Imaging and Its TrEatment With Anticoagulation	Phase 1: Patients with a history of SAVR or TAVR with bioprosthetic aortic valves undergo\n      cardiac contrast CT imaging and transthoracic echocardiography to evaluate structural and\n      functional integrity of the aortic valves. The imaging studies will be performed at least\n      48-hours after TAVR/SAVR.\n\n      Phase 2: Patients with prosthetic valve abnormalities suggestive of thrombus will be\n      administered anticoagulation therapy with Vitamin K antagonists (Warfarin) for 3 months with\n      goal International Normalized Ratio (INR) 2-3, followed by repeat contrast CT of the chest\n      and transthoracic imaging. Repeat imaging following 3 months of anticoagulation therapy is\n      performed to evaluate the response to anticoagulation therapy. INR levels will be monitored\n      and warfarin dose adjusted to maintain target INR 2-3.	Recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n        Phase 1\\n\\n          -  Presence of transcatheter or surgical bioprosthetic aortic valve implanted at least\\n             48 hours prior to enrollment\\n\\n          -  Age 18 years or older\\n\\n          -  Ability to provide informed consent and follow-up with protocol procedures.\\n\\n        Phase 2\\n\\n          -  Appearance of thrombotic changes in the bioprosthetic valves\\n\\n        Exclusion Criteria:\\n\\n          -  Renal insufficiency (creatinine > 1.5 mg/dL)\\n\\n          -  Known allergy to iodinated contrast agents"}, "maximum_age": "N/A", "minimum_age": "18 Years", "healthy_volunteers": "No"}	200	2014-12-01	Interventional	Endpoint Classification: Safety/Efficacy Study, Intervention Model: Single Group Assignment, Masking: Open Label, Primary Purpose: Treatment	N/A	[{"measure": "Frequency of patients with structural/functional abnormalities of bioprosthetic valves", "time_frame": "3 months", "safety_issue": "Yes"}]	[]
e93439dee88249fb93d9e3a038d3bd9a	nct	NCT02332356	{"others": null}	2015-01-04	Therapeutic Optimization Study Based on MR Enterocolonography in Patients With Crohn's Disease	This randomized, controlled study aims to evaluate the impact of therapeutic intervention\n      (step up) for the patients who are clinical remission with Magnetic Resonance\n      Enterocolonography (MREC) active. In addition, to evaluate the impact of therapeutic step\n      down for the patients who archived clinical and MREC remission. The primary endpoint is the\n      rate of clinical remission at 104 weeks.	Therapeutic Optimization Study Based on MR Enterocolonography in Patients With Crohn's Disease	\N	Recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Clinical diagnosis of Crohn's and proven history of disease with clinical remission\\n             (CDAI<150)\\n\\n          -  Signed written consent form to enroll the study (Need agreement from deputy for\\n             patients under 20years old)\\n\\n        Exclusion Criteria:\\n\\n          -  Contraindication for infliximab, adalimumab, or azathioprine\\n\\n          -  Lactating woman\\n\\n          -  Presence of malignancy\\n\\n          -  Within 3 month from intestinal surgery\\n\\n          -  Presence of an end stoma\\n\\n          -  Planned surgery"}, "maximum_age": "65 Years", "minimum_age": "16 Years", "healthy_volunteers": "No"}	100	2014-09-01	Interventional	Allocation: Randomized, Intervention Model: Parallel Assignment, Masking: Open Label, Primary Purpose: Prevention	Phase 3	[{"measure": "The rate of clinical remission at 104 weeks.", "time_frame": "104 weeks", "safety_issue": "Yes"}]	[{"measure": "The rate of hospitalization and operation", "time_frame": "104 weeks", "safety_issue": "Yes"}]
df8e3de108ba464fa10485b35999725b	nct	NCT02332382	{"others": null}	2015-01-04	The Influence of Mother Nutrition on Breast Milk Microbiome	The research subject\n\n      Health organizations around the world have determined that breastfeeding is the most\n      critical source of nutrition for newborns in the first weeks and months of their lives. A\n      mother's breast milk contains unique nutritious components and other nonnutritive elements\n      that help promote healthy baby growth and development (1, 2). Recent studies show that a\n      mother's breast milk contains components that vary from each specimen. There are great\n      evidences that maternal and environmental factors have a strong influence on the composition\n      of breast milk. Fatty acids, the second most common component found in breast milk, show\n      extreme sensitivity to maternal nutrition (3, 4).\n\n      Latest studies show that breast milk also contains bacterial communities that may have\n      health implications of newborn. The structure of these bacterial communities also varied\n      greatly between subjects (5) .\n\n      In the research, we propose to investigate the connection between maternal nutrition,\n      different fatty acids and their role in the growth and development of bacterial populations\n      existing in breast milk.	The Influence of Mother Nutrition on the Composition of Fatty Acid, Oligosacharides and Its Effect on Breast Milk Microbiome	\N	Not yet recruiting	{"gender": "Female", "criteria": {"textblock": "Inclusion Criteria:Healthy lactating women, breast feeding for the first 3 months after\\n        delivery\\n\\n        Exclusion Criteria: No compliance, sickness, drug consumption"}, "study_pop": {"textblock": "Healthy lactating women"}, "maximum_age": "N/A", "minimum_age": "N/A", "sampling_method": "Non-Probability Sample", "healthy_volunteers": "Accepts Healthy Volunteers"}	20	2015-02-01	Observational [Patient Registry]	Observational Model: Case-Only, Time Perspective: Prospective	N/A	[{"measure": "Change in breast milk composition in relation to nutritional intake", "time_frame": "3 months", "safety_issue": "No"}]	[]
01feee5811754170917068f8f40027d0	nct	NCT02332408	{"others": null}	2015-01-04	CyberKnife Based Hypofractionated Radiotherapy for Vertebral Hemangiomas	Clinical objective of the study is to compare the analgesic effect, toxicity and pathologic\n      effect in the tumors of two radiotherapy schedules used for patients suffering from painful\n      vertebral haemangiomas	CyberKnife Based Hypofractionated Radiotherapy Versus Conventional Linac Based Radiotherapy for Painful Vertebral Hemangiomas - Controlled Randomized Clinical Trial.	Hemangiomas are frequent vertebral lesions (12% of the whole human population) but only 1%\n      displays any clinical symptoms . The most common symptom is local pain, usually non\n      responding for non-steroid anti-inflammatory drugs. Radiation therapy usually does not\n      result calcification or the tumor regression, but significantly reduces the pain intensity\n      or eliminates it. Currently, the most common RT schedule is conventional radiotherapy using\n      fraction dose (fd) of 2 Gy delivered to the total dose (TD) varying from36 Gy to 40 Gy. The\n      results in pain reduction achieved after larger total doses are better that led us to use\n      radioablative techniques. This procedure is associated with a probability of better\n      analgesic effect and the good local effect (calcification and / or regression of laesion)\n      with high safety of radiation delivery using tracking based cybernetic microradiosurgery\n      (CyberKnife).\n\n      The comparison of two modalities of radiation therapy (conventional [fd 2 Gy, TD 36 Gy] and\n      hypofractionated [fd 5 Gy, TD 25 Gy]) used for treatment of painful vertebral hemangioma\n      patients will be performed in the phase III randomized study.\n\n      80 patients will be enrolled in this study. All patients will be planned (RT) on the base of\n      CT/MRI fusion.\n\n      Patients will be controlled 1, 3, 6, 9, 12 months after treatment completion and, next every\n      each 6 months. Pain relief, analgesics uptake, local effect (MRI and Technetium -\n      99m-labelled RBC(red blood cell) scintigraphy) and eventual toxicity will be checked during\n      follow-up (FU).	Recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          1. Confirmed vertebral hemangioma ,\\n\\n          2. Lesion visible in CT and MR\\n\\n          3. Pain located in area of the lesion\\n\\n          4. Informed consent for participation in the study and for radiotherapy in interested\\n             area\\n\\n        Exclusion Criteria:\\n\\n          1. Any previous radiotherapy in region of treated hemangioma\\n\\n          2. Spinal damage or disease that may be associated with an increased radiosensitivity\\n\\n          3. The coexistence of the vertebral morphological changes at the level of hemangioma\\n             causing pressure on the nerve roots and / or spinal cord causing pain located in that\\n             area\\n\\n          4. Neurological deficits caused by the presence of hemangioma (patients should be\\n             considered for surgery)\\n\\n          5. Contradictions for MRI\\n\\n          6. Lack of informed consent."}, "maximum_age": "85 Years", "minimum_age": "25 Years", "healthy_volunteers": "No"}	80	2014-09-01	Interventional	Allocation: Randomized, Endpoint Classification: Safety/Efficacy Study, Intervention Model: Parallel Assignment, Masking: Open Label, Primary Purpose: Treatment	Phase 3	[{"measure": "Analgetic effect", "time_frame": "2 years", "description": "rate of pain relief", "safety_issue": "No"}]	[{"measure": "Identification of radiologic prognostic and predictal factors of response to external beam radiotherapy (radiosurgery compared to conventional)", "time_frame": "2 years", "safety_issue": "No"}, {"measure": "Identification of biochemical and physical prognostic factors of response to external beam radiotherapy (radiosurgery compared to conventional)", "time_frame": "2 years", "safety_issue": "Yes"}]
6c02563e661a4dada5e55d1f9935d803	nct	NCT02332746	{"others": null}	2014-12-18	Exploring Temporal Relationships Between Self-worth and Physical Activity Middle-aged Women	The purpose of this study is to explore temporal relationships between self-worth and\n      physical activity (PA) participation in middle-aged women (aged 35-64 years). We are\n      particularly interested in the predictive role of self-worth on women's daily PA\n      participation.\n\n      This study will include two phases: a pilot phase to test the procedures and a test phase to\n      assess self-worth and PA. During the test phase, Women will receive text message prompts in\n      the morning, afternoon, and evening for 28 days on their cell phones. Each prompt will\n      include a link to an 11-item mobile Internet-based survey assessing momentary PA,\n      self-worth, and self-efficacy. Women will also concurrently wear an activity monitor\n      (GENEActiv) to objectively measure their activity levels throughout the study.	Novel Exploration of Temporal Relationships Between Self-worth and Physical Activity in Middle-aged Women	Using ecological momentary assessment, the purpose of this study is to explore temporal\n      relationships between self-worth and physical activity (PA) participation in middle-aged\n      women (aged 35-64 years).\n\n      This study will occur in two phases. During an initial pilot phase ten women will be asked\n      to test the instruments and procedures for this study. During the second phase, the test\n      phase, 60-100 women will be asked to complete daily surveys assessing their self-worth,\n      self-efficacy, and PA participation. The results of the pilot phase will be used to modify\n      instruments and procedures before the test phase commences.\n\n      During the pilot phase, 10 women will be asked to participate in an initial intake\n      appointment to sign the informed consent form, complete baseline questionnaires, receive an\n      activity monitor, and receive instructions on completing the daily surveys and wearing the\n      activity monitor. Women will also be asked to provide their typical daily wake times and\n      bedtimes during this appointment to guide the sampling schedule. Ecological momentary\n      assessment (EMA) in which women receive two or three daily prompts to complete a short\n      survey will be used in this study. Women will be asked to answer seven questions assessing\n      their momentary activity (1), self-efficacy (1), and self-worth (5) twice per day for one\n      week and three times per day for one week. Five women will be assigned to each condition\n      each week so that half of the sample receives the twice per day condition during the first\n      week and half receives the twice per day condition during the second week of the pilot\n      phase. Women sampled twice per day will be prompted to complete assessments 1) 15 minutes\n      after their typical wake time reported during their intake appointment and 2) 90 minutes\n      prior to their typical bedtime. Women sampled three times per day will be prompted one\n      additional time during the afternoon (random time between 2:00 and 3:00pm). Women will be\n      prompted to complete the survey via text message. A link will be provided in each text\n      message to direct women to a mobile compatible Qualtrics survey containing seven items\n      assessing women's current activity, self-efficacy, general self-worth, knowledge self-worth,\n      emotional self-worth, social self-worth, and physical self-worth. At the end of the two week\n      pilot phase, women will be asked to complete a survey to provide feedback on the sampling\n      scheme and the usability of the mobile survey. Results of the survey will inform\n      modifications to the test phase.\n\n      During the test phase, 60-100 women will be asked to participate in an initial intake\n      appointment to sign the informed consent form, complete baseline questionnaires, receive an\n      activity monitor, and receive instructions on completing the daily surveys and wearing the\n      activity monitor. Women will be asked to answer eleven questions assessing their current\n      activity (1), self-efficacy (1), and self-worth (9) three times per day for 28 days,\n      depending upon the results of the pilot phase. The three-times daily sampling scheme will be\n      adopted for the test phase. Therefore, women will receive text message prompts with a link\n      to the mobile compatible Qualtrics survey daily in the morning, afternoon, and evening.\n\n      Current activity will be measured using an item modified from a recent EMA study by Dunton\n      and colleagues (2012). Using a list of options, this item assesses the activity in which the\n      participant was engaged immediately prior to receiving the prompt. One item from the\n      Exercise Self-Efficacy Scale (McAuley, 1993) will be used to assess women's confidence in\n      their ability to participate in daily PA on a scale of 0% to 100% - "I am able to\n      participate in physical activity at a moderate intensity for 30+ minutes today without\n      quitting." General self-worth will be measured using one item from the general self-worth\n      subscale of the Adult Self-Perception Profile (Messer & Harter, 1986). Women will choose\n      among four statements to indicate how they feel about themselves: "Which of the following\n      statements is most true of how you feel RIGHT NOW? It is REALLY TRUE that I am dissatisfied\n      with myself It is SORT OF TRUE that I am dissatisfied with myself It is SORT OF TRUE that I\n      am satisfied with myself It is REALLY TRUE that I am satisfied with myself"\n\n      The Women's Physical Activity Self-Worth Inventory (WPASWI) (Huberty et al., 2013) will be\n      used to measure knowledge, emotional, and social self-worth. Women will be asked the extent\n      to which they agree (strongly disagree, somewhat disagree, somewhat agree, strongly agree)\n      with statements describing their knowledge, emotional, and social self-worth. One WPASWI\n      item from each of the self-worth domains was chosen for the pilot phase. Based upon results\n      of the pilot phase, the EMA survey was modified for the test phase and two items were chosen\n      to assess each domain, for a total of six items from the WPASWI. Examples include: "RIGHT\n      NOW - My knowledge about physical activity affects the way I feel about myself." (knowledge\n      self-worth) "RIGHT NOW - I feel it is important to take time to be physically active today."\n      (emotional self-worth) "RIGHT NOW - I need to know I have friends or family to support my\n      commitment to exercise in order to feel good about myself." (social self-worth)\n\n      Two items from the Physical Self-Perception Profile (Fox & Corbin, 1989) will be used to\n      measure perceived body attractiveness and physical condition, both important subdomains of\n      physical self-worth. Women will be asked the extent to which they agree (strongly disagree,\n      somewhat disagree, somewhat agree, strongly agree) with the following statements:\n\n      "RIGHT NOW - I feel confident about the appearance of my body." (body attractiveness) "RIGHT\n      NOW - I am confident in my level of physical conditioning and fitness." (physical condition)\n\n      In summary, the EMA survey used in the test phase of this study will include eleven items\n      assessing momentary activity (1) (Dunton et al., 2012); self-efficacy (1) (McAuley, 1993),\n      general self-worth (1) (Messer & Harter, 1986); knowledge (2), emotional (2), and social (2)\n      self-worth (Huberty et al., 2013); and physical self-worth (2) (Fox & Corbin, 1989).\n\n      Women will also be asked to wear a GENEActiv accelerometer for the duration of their\n      participation in the study (14 days for the pilot phase and 28 days for the test phase). All\n      participants will receive their GENEActiv during the initial intake appointment and will\n      return the device during a schedule appointment with a researcher. Women not local to the\n      Phoenix area will receive and return their GENEActiv by mail. As part of wearing the\n      activity monitor, women will also be asked to log their wear time, wake time, and bedtime.\n      All participants will receive comprehensive feedback on their time spent in sedentary,\n      light, moderate, and vigorous activity each day.\n\n      During the intake appointment, women will also be asked to complete the full-length\n      questionnaires upon which the EMA survey was developed (i.e., Exercise Self-Efficacy Scale\n      [McAuley, 1993], Adult Self-Perception Profile [Messer & Harter, 1986], WPASWI [Huberty et\n      al., 2013], Physical Self-Perception Profile [Fox & Corbin, 1989]), a demographics\n      questionnaire, and a regular PA questionnaire (Past-Week Modifiable Activity Questionnaire\n      [Gabriel et al., 2010]).	Completed	{"gender": "Female", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  35-64 years of age\\n\\n          -  English speaking\\n\\n          -  Able to ambulate\\n\\n          -  Own a mobile phone with access to text messaging and cellular Internet\\n\\n          -  Able to receive text messages from a short code\\n\\n          -  Agree that user rates will apply when receiving text messages and completing\\n             assessments\\n\\n        Exclusion Criteria:\\n\\n          -  Males\\n\\n          -  Not within age range; children\\n\\n          -  Non-English speaking\\n\\n          -  Unable to ambulate\\n\\n          -  Do not own a mobile phone with access to text messaging or cellular Internet\\n\\n          -  Not able to receive text messages from a short code\\n\\n          -  Do not agree to accept user rates"}, "study_pop": {"textblock": "Nationally recruited sample of active and inactive middle-aged women (35-64 years-old)"}, "maximum_age": "64 Years", "minimum_age": "35 Years", "sampling_method": "Non-Probability Sample", "healthy_volunteers": "Accepts Healthy Volunteers"}	\N	2013-09-01	Observational	Observational Model: Cohort, Time Perspective: Prospective	N/A	[{"measure": "Self-Worth", "time_frame": "28 days", "description": "General self-worth: One item from the general self-worth subscale of the Adult Self-Perception Profile (Messer & Harter, 1986) Knowledge, emotional, and social self-worth: Six items (two per self-worth domain) from the Women's Physical Activity Self-Worth Inventory (Huberty et al., 2013) Physical self-worth: Two items from the Physical Self-Perception Profile (Fox & Corbin, 1989)", "safety_issue": "No"}, {"measure": "Physical Activity - Accelerometer", "time_frame": "28 days", "description": "GENEActiv wrist-worn accelerometer", "safety_issue": "No"}]	[{"measure": "Exercise Self-Efficacy", "time_frame": "28 days", "description": "One item from the Exercise Self-Efficacy Scale (McAuley, 1993)", "safety_issue": "No"}, {"measure": "Current Activity", "time_frame": "28 days", "description": "One item from a recent EMA study by Dunton et al. (2012)", "safety_issue": "No"}]
b0fb783f005841acbc4f462688e2473a	nct	NCT02332486	{"others": ["81403441"]}	2014-12-30	Based on Metabonomics Dryness Pathogen Type of OLP: a Dynamic Study	Due to the change of life style, the incidence of oral cavity mucous membrane disease\n      increased.In this study，been done a large number of pre-clinical practice and some\n      experimental studies， based on the application of metabolomics technology to ultra-high\n      liquid-mass spectrometry metabolomics analyzer as the core means， The metabolism of pattern\n      recognition and combination of modern analytical techniques to measure blood and urine of\n      patients with OLP-specific clearance of endogenous metabolites，and after the intervention of\n      moss drink endogenous metabolites in the body as a whole group of. At the same time， the use\n      of flow cytometry,，ELISA， immunohistochemistry and other modern technology, research OLP\n      patients using clean moss drink before and after treatment of local lesions and peripheral\n      blood CD4 +，CD8 + lymphocytes，Th1 cytokines (IFN-γ， TNF-α)， Th2 cytokines (IL-4，10) the\n      dynamic changes. From metabolomics， cellular immunology， inflammation mechanism perspective\n      of local OLP lesions， peripheral blood and changes in endogenous metabolites in the\n      process,，in-depth study of traditional Chinese medicine to drink clean moss multi-component\n      multi-target treatment of this disease mechanism， is widely used in traditional Chinese\n      medicine treatment of OLP provide a theoretical basis for the promotion of Chinese medicine\n      Qingxian Yin in the oral mucosal disease in the application， effectively solve clinical\n      practice problems.	Based on Metabonomics Dryness Pathogen Type of Oral Lichen Planus of Dynamic	\N	Not yet recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  All patients with OLP .\\n\\n          -  TCM syndrome of OLP patients included is dryness pathogen type.\\n\\n          -  In the lesions of oral mucosa there are phanerous pearly white keratinization\\n             stripes, or patches, or phanerous erosion with the mucous membrane hyperemia.\\n\\n          -  OLP patients may accompany oral coarse discomfort or pain, red tongue, yellow dry or\\n             dry fur, dry mouth, bitter taste.\\n\\n        Exclusion Criteria:\\n\\n          -  Patients with other established oral mucosal disease;\\n\\n          -  Patients accompanied by serious systemic diseases, eg damaged liver or kidney\\n             functions; Or other allergic diseases, eg rheumatic disease or cancer.\\n\\n          -  Patients using the antibiotic in the last one month or immunologic agents in the last\\n             three months.\\n\\n          -  Lichenoid reaction caused by drugs or the filling with silver and amalgam.\\n\\n          -  Patients with smoking or alcoholism in the last three months."}, "maximum_age": "45 Years", "minimum_age": "30 Years", "healthy_volunteers": "Accepts Healthy Volunteers"}	25	2015-01-01	Interventional	Allocation: Non-Randomized, Endpoint Classification: Safety/Efficacy Study, Intervention Model: Parallel Assignment, Masking: Open Label, Primary Purpose: Basic Science	N/A	[{"measure": "visualanalogue scale", "time_frame": "every week of eight weeks", "safety_issue": "No"}]	[{"measure": "Cytokines", "time_frame": "every week of eight weeks", "description": "IFN-γ, TNF-α, IL-4 and IL-10 of the blood cells of CD4+/CD8+ and Th1/Th2 will be tested by flow cytometry or ELISA.", "safety_issue": "No"}, {"measure": "Cytokines", "time_frame": "rvery week of eight weeks", "description": "IFN-γ, TNF-α, IL-4 and IL-10 of the lesion tissue cells of CD4+/CD8+ and Th1/Th2 will be tested by immunohistochemistry", "safety_issue": "No"}, {"measure": "Biomarker", "time_frame": "every week of eight weeks", "description": "Metabolites profiles of individual in the intervention group will be analysed by PCA、OPLS-DA or UPLC-MS.", "safety_issue": "No"}]
e6809e6d890345bf845db683fc93de82	nct	NCT02332811	{"others": ["U1111-1160-6394"]}	2014-12-16	An Open Label, Dose Titration Study of Sevelamer Carbonate Tablets & Powder in Hyperphosphatemic CKD Patients	Primary Objective:\n\n      Evaluate the reduction in serum phosphorus from baseline to end of study with Sevelamer\n      carbonate tablets 800 mg and Sevelamer carbonate Powder 2.4 g in chronic kidney disease\n      (CKD) patients both on haemodialysis and not on dialysis\n\n      Secondary Objective:\n\n      Evaluate the safety on the basis of adverse events, changes in laboratory values and vital\n      signs from baseline (Day 0) to Day 56 (End of treatment/ End of Study)	An Open Label, Dose Titration Study of Sevelamer Carbonate Tablets & Powder in Hyperphosphatemic Chronic Kidney Disease Patients	10 weeks including, 2 weeks wash-out period and 8 weeks study treatment period	Completed	{"gender": "Both", "criteria": {"textblock": "Inclusion criteria :\\n\\n        Men or women 18 years of age or older suffering from CKD not on dialysis or on a stable\\n        haemodialysis regimen\\n\\n          -  If currently on phosphate binder(s), willing to stop this and enter a 2 week washout\\n             period\\n\\n          -  Willing to avoid any intentional changes in diet such as fasting or dieting\\n\\n          -  Have the following laboratory measurement:\\n\\n               -  iPTH ≤ 1000 pg/mL at screening (including results obtained within 60 days prior\\n                  to screening)\\n\\n               -  If not taking a phosphate binder, a serum phosphorus measurement >5.5 mg/dL\\n                  (1.78 mmol/L) at Screening (Visit 1).\\n\\n               -  If taking a phosphate binder at screening, a serum phosphorus measurement > 5.5\\n                  mg/dL (1.78 mmol/L) after the two-weeks washout period at Visit 1a (Day 0).\\n\\n          -  Willing and able to take Sevelamer carbonate alone as a phosphate binder for the\\n             duration of the study\\n\\n          -  Willing and able to avoid antacids and phosphate binders containing aluminum,\\n             magnesium, calcium or lanthanum for the duration of the study\\n\\n          -  Willing and able to maintain screening doses of vitamin D, and/or cinacalcet for the\\n             duration of the study, except for safety reasons\\n\\n          -  If female and childbearing potential (pre-menopausal and not surgically sterile),\\n             willing to use an effective contraceptive method throughout study, which includes\\n             barrier methods, hormones, or intrauterine devices\\n\\n          -  For patients not on dialysis expecting not to initiate dialysis for the duration of\\n             this study\\n\\n          -  Signed informed consent\\n\\n          -  Has not participated in any other investigational drug studies within 30 days prior\\n             to enrollment\\n\\n          -  Level of understanding and willingness to cooperate with all visits and procedures as\\n             described by the study personnel\\n\\n        Exclusion criteria:\\n\\n          -  Active dysphagia or swallowing disorder\\n\\n          -  Predisposition or current bowel obstruction,\\n\\n          -  Severe gastrointestinal (GI) motility disorders including severe constipation\\n\\n          -  Active ethanol or drug abuse, excluding tobacco use\\n\\n          -  Use of anti-arrhythmic or anti-seizure medications for arrhythmia or seizure\\n             disorders.\\n\\n          -  In the opinion of the investigator, patient has poorly controlled diabetes mellitus,\\n             poorly controlled hypertension, active vasculitis, HIV infection, or any clinically\\n             significant unstable medical condition\\n\\n          -  Planned renal transplant or parathyroidectomy within 3 months of Visit 1\\n\\n          -  Pregnant or breast-feeding\\n\\n          -  Evidence of active malignancy except for basal cell carcinoma of the skin\\n\\n          -  Unable to comply with the requirements of the study\\n\\n          -  Known hypersensitivity to sevelamer or any constituents of the study drug\\n\\n          -  Any other condition, which in the opinion of the investigator will prohibit the\\n             patient's inclusion in the study\\n\\n        The above information is not intended to contain all considerations relevant to a\\n        patient's potential participation in a clinical trial."}, "maximum_age": "N/A", "minimum_age": "18 Years", "healthy_volunteers": "No"}	\N	2013-10-01	Interventional	Allocation: Randomized, Endpoint Classification: Efficacy Study, Intervention Model: Parallel Assignment, Masking: Open Label, Primary Purpose: Treatment	Phase 3	[{"measure": "The reduction in serum phosphorus from baseline to end of study with Sevelamer carbonate tablets 800 mg and Sevelamer carbonate Powder 2.4 g in chronic kidney disease (CKD) patients both on haemodialysis and not on dialysis", "time_frame": "up to 8 weeks", "safety_issue": "No"}]	[]
7371e77b756145728b4655fd0cdc4722	nct	NCT02332525	{"others": null}	2015-01-03	The Influence of Oral Vibrational Stimulation on Cognitive Function of Elderly Individuals	The purpose of this study is to investigate the effect of oral vibratory stimulus on the\n      brain activity and cognitive function of elderly people with non-dementia subjects\n      (cognitive normal, mild cognitive impairment)	The Influence of Oral Vibrational Stimulation on Brain Activity and Cognitive Function of Elderly Individuals With Mild Cognitive Impairment	Evaluating the effect of oral vibratory stimulus on the brain activity and cognitive\n      function of elderly people with mild cognitive impairment\n\n      ◇ Test design: Open-labeled, prospective, pre-post study\n\n      ○ Oral vibratory stimulus: As an optimal algorithm drawn through the first year study, the\n      vibratory stimulus is applied 10 times for 15 days (a 5-minute stimulus is applied two times\n      a day for 10 days, and it is composed of repeated 15-second vibratory and 15-second\n      non-vibratory stimulus with a strength of 3.3V).	Not yet recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria\\n\\n          -  A person who has at least 20 natural teeth, including the first molars (including\\n             fixed prostheses and implants, excluding removable prostheses)\\n\\n          -  A person who has systemic health, including controlled hypertension/hypotension and\\n             diabetes patients\\n\\n          -  An elderly person who has been diagnosed with normal cognition or mild cognitive\\n             impairment in a neuropsychological test and CERAD clinical evaluation (refer to\\n             separate inclusion criteria)\\n\\n        Exclusion Criteria\\n\\n          -  A person who has medical history of nervous system disease\\n\\n          -  A person who is has ever been allergic to resin\\n\\n          -  A person who has untreated periodontal disease and/or severely loose teeth\\n\\n          -  A person who has a medical treatment history of temporomandibular disorders, who has\\n             an occurrence of stomatitis once or more per month within the last 6 months, or who\\n             currently has stomatitis\\n\\n          -  A person who is receiving or has received treatment for major mental diseases such as\\n             dementia, major depression, or mania based on the DSM-IV diagnosis\\n\\n          -  A person who has a medical disease that can have a serious effect on cognitive\\n             function or is taking related medicine\\n\\n          -  A person who has a transplant that is electrically or mechanically operated or a\\n             cerebrovascular clip or who has claustrophobia so that an MRI scan is impossible"}, "maximum_age": "75 Years", "minimum_age": "50 Years", "healthy_volunteers": "Accepts Healthy Volunteers"}	20	2015-01-01	Interventional	Endpoint Classification: Safety/Efficacy Study, Intervention Model: Single Group Assignment, Masking: Open Label, Primary Purpose: Treatment	Phase 1/Phase 2	[{"measure": "cognitive function", "time_frame": "15 days", "description": "Cambridge Neuropsychological Test Automated Battery (CANTAB, Cambridge Cognition, Cambridge, United Kingdom) (Sahgal, et al., 1992; Blackwell, et al., 2004; O'Connell, et al., 2004; Junkkila, Oja, Laine, & Karrasch, 2012)\\nPaired Associates Learning (PAL) : Memory function\\nSpatial Working Memory (SWM): frontal-executive function\\nStockings Of Cambridge (SOC): spatial planning ability and problem-solving ability", "safety_issue": "No"}]	[{"measure": "quantitative electroencephalography (QEEG) and event-related potentials (ERPs)", "time_frame": "15 days", "description": ": Based on a significant reduction of the relative power of α-wave (8-13Hz) and significant increase of the relative power of β-wave (13-30Hz)\\n- Short-term and long-term ERP changes caused by oral vibratory stimulus: Change of amplitude and latency period of P300, the ERP component related to attention", "safety_issue": "No"}, {"measure": "functional magnetic resonance imaging (fMRI)", "time_frame": "15 days", "description": "Assessing what difference the activated areas show compared to the results of the previous studies that identified the activated parts after masticatory activities when only oral vibratory stimulus is given without masticatory activities", "safety_issue": "No"}, {"measure": "masticatory ability", "time_frame": "15 days", "description": "Unilateral maximal bite force is measured with a simple bite force gauge with a stick form (GM 10 occlusal force-meter: Nagano Keiki C., LTD, Japan). This is measured three times in a place where the subject feels at ease.\\nMaximum bite force: Numeric difference before and after the application of vibratory stimulus\\nEvaluation of masticatory ability: The change of Shape and color difference ofin gum before and after the application of vibratory stimulus", "safety_issue": "No"}, {"measure": "salivary secretion", "time_frame": "15 days", "description": "Evaluation of salivary secretion amount: mL per unit time (min) of saliva collected before and after the application of vibratory stimulus\\nEvaluation of compliance: The measurement of Tthe number of performances ofperforming the oral vibratory stimulus for 15 days for two times/day", "safety_issue": "No"}]
f9957d004f1e4250abfa0f94d9ee3927	nct	NCT02333214	{"others": null}	2014-12-22	Effectiveness of a Program Using Video Games Associated With Conventional Physiotherapy in Physical Functioning in Frail Elderly Compared to Conventional Physiotherapy	Frailty is a highly prevalent condition, reaching approximately 7% to 30% of older adults\n      aged from 65 up to 80 years [2]. Although exercises seemed to be beneficial for the frail\n      elders, there is still insufficient evidence to indicate the appropriate modality, frequency\n      and intensity of physical exercises that were able to improve physical functioning in this\n      population [9]. The virtual reality (VR) using interactive games (exergames) have generated\n      broad scientific and clinical interest in recent years[10]. Studies indicate that older\n      adults can benefit from training with exergames in improving mobility [12, 13], lower limb\n      strength [14], cognition, particularly executive function [13], body balance [10, 15-18],\n      reaction time [12] and may contribute indirectly to prevent falls [10, 19, 20]. But, there\n      is still insufficient evidence to suggest that the use of exergames are superior even to\n      other types of intervention [21-23] or in combination with conventional physiotherapy [24]\n      The purpose of this study is to investigate the effectiveness of adding exercises using\n      interactive videogames (exergames) in improving physical functioning on frail and pre frail\n      older people when compared to conventional physiotherapy. A parallel randomized clinical\n      with a 6 month follow-up period will be conducted with 82 frail community dwelling older\n      adults. Participants randomized to the Experimental Group will be submitted to 30 minutes of\n      conventional physiotherapy and 20 minutes of therapy using interactive games Xbox 360 Video\n      Game and Entertainment Microsoft System with Kinect sensor.\n\n      The Control Group will receive 50 minutes of conventional physiotherapy. Both groups will\n      receive 50 minutes of intervention twice a week for 12 weeks. Primary outcomes will be\n      assessed by the Short Physical Performance Battery, the Usual walking speed test and Four\n      Step Square Test in the baseline, 3 and 6 months after that.	The Effectiveness of an Exercise Program Using Video Games Associated With Conventional Physiotherapy in Physical Functioning in Frail Elderly Compared to Conventional Physiotherapy: Randomized Clinical Trial	Frailty is considered a biological geriatric syndrome, characterized by a decreased\n      resistance to stresses and functional reserve due to the cumulative decline in multiple\n      physiological systems, with consequent increased state of vulnerability [2]. Negative health\n      related outcomes, such as disability, recurrent hospitalization, institutionalization, falls\n      and mortality [2-4] are associated with frailty, considered an emerging public health\n      problem [2, 5]. Physical exercise has been recommended as an intervention strategy for the\n      prevention and rehabilitation of the mobility-related outcome in the frail elderly whit\n      positive impact on functional capacity and performance [8].\n\n      A functional downward spiral characterized by an impairment of several functional domains,\n      such as strength, muscular endurance and motor-cognitive processes, ultimately leading to\n      restricted mobility and decreased physical activity level is commonly observed in frail\n      older people. Interventions that promote the integration of multisensory, cognitive and\n      motor skills can be able to motivate the older people to remain more active for longer\n      periods, despite their limitations. Exergames involve tasks in virtual environments that\n      combine physical and cognitive demands in an attractive and challenging way. The player is\n      encouraged to achieve goals and overcome limits during the game, providing immediate\n      feedback in relation to their performance. The game experience can create a greater sense of\n      self-efficacy and generate a more positive perception of personal skills, modulated by a\n      positive environment reinforcement, consequently increasing motivation and engagement. This\n      combination of greater sense of self-efficacy and greater motivation could provide a\n      positive and necessary influence for most older people to overcome their limitations and\n      create new lifestyle habits [25], decreasing disability. This study sought to investigate\n      the effectiveness of adding exercises using interactive videogames (exergames) in improving\n      physical functioning on frail and pre frail older people when compared to conventional\n      physiotherapy.	Recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n        Community dwelling older adults without severe cognitive impairment (defined as a Mini\\n        Mental State Examination (MMSE) score adjusted according to the educational level with\\n        reference cutoff scores of: 13 points for those who are illiterate, ; 18 points for those\\n        with elementary and middle levels, and 26 points for those who have a high level 26),\\n        without any physiotherapy intervention for at least three months and classified as frail\\n        or pre-frail, according to the phenotype of frailty using Fried et al. criteria:\\n\\n          1. Unintentional weight loss of ≥ 5% or ≥ 4.5kg body weight in the previous year.\\n\\n          2. Exhaustion assessed by self-reported fatigue, indicated by two questions of the\\n             Center for Epidemiological Studies - Depression: (a) I felt that everything I did was\\n             an effort; (b) I could not get going. . Subjects answering \\"2\\" or \\"3\\" to either of\\n             these questions are categorized as frail by the exhaustion criterion.\\n\\n          3. Decreased grip strength (kg/force) in the dominant hand adjusted according to sex and\\n             body mass index (BMI). The cutoff for grip strength (Kg) criterion for men 2will be:\\n             BMI ≤ 24 grip strength ≤ 29; BMI 24,1 - 28 grip strength ≤ 30; BMI > 28 grip strength\\n             ≤ 32. The cutoff for grip strength (Kg) criterion for women will be 2: BMI ≤ 23 -\\n             grip strength ≤ 17; BMI 23,1 - 26 grip strength ≤ 17,3; BMI 26,1 - 29 grip strength ≤\\n             18; BMI > 29 grip strength ≤ 21.\\n\\n          4. Low level of physical activity. Participants will meet the criterion for physical\\n             inactivity if, in the last two weeks they did not perform a planned physical activity\\n             at least twice a week lasting more than 30 minutes or, if they did not perform\\n             planned or unplanned walks lasting for more than 15 minutes at least twice a week or,\\n             if they had performed any moderate or vigorous housework activity (> 2,5 METS) such\\n             as: wash or mop the floor, vacuuming, washing windows or wash the car frequently at\\n             least 1x a week for 30 minutes.\\n\\n          5. Slow walking speed. The time to walk a 4.6 meters path, with two meters for\\n             acceleration and two for deceleration, will be measured The velocity for each\\n             participant will be recorded. Those with a gait speed equal or less than 0.8 m/s will\\n             be considered frail.\\n\\n        Exclusion Criteria:\\n\\n        Severe visual impairment that prevents interaction with video games, if they had a\\n        localized loss of muscle strength and/or changes in postural tone that impede the\\n        execution of safe displacement movements in the standing position, without the aid of\\n        another person and, if they present chronic or acute diseases that contra-indicate\\n        therapeutic exercises."}, "maximum_age": "N/A", "minimum_age": "60 Years", "healthy_volunteers": "No"}	82	2014-10-01	Interventional	Allocation: Randomized, Endpoint Classification: Efficacy Study, Intervention Model: Parallel Assignment, Masking: Single Blind (Investigator), Primary Purpose: Treatment	N/A	[{"measure": "Change in the Short Physical Performance Battery", "time_frame": "baseline, immediately after the intervention (12 weeks) and at 6 months", "description": "Three batteries of tests covering dimensions: balance, usual walking speed and sit-to-stand test, with scores ranging from zero (worst performance) to 12 points (best performance).", "safety_issue": "Yes"}, {"measure": "Change in the Usual walking speed test", "time_frame": "baseline, immediately after the intervention (12 weeks) and at 6 months", "description": "The test will be conducted on a flat surface with 8.6 meters free marked by black tape at intervals of two meters, 4,6 meters and two meters and the participant will be instructed to walk at their usual pace using their usual footwear.", "safety_issue": "Yes"}, {"measure": "Change in the Four Step Square Test", "time_frame": "baseline, immediately after the intervention (12 weeks) and at 6 months", "description": "Assessment of participants balance and their ability to carry out changes in the direction of the step forward, backward, and sideways, surpassing a low obstacle.", "safety_issue": "Yes"}]	[{"measure": "Change in the The timed 5-step test", "time_frame": "baseline, immediately after the intervention (12 weeks) and at 6 months", "description": "Assessment of participants dynamic balance. During the test the participant will step forward and up and backward and down from a 10.1 cm step five times as fast as possible", "safety_issue": "Yes"}, {"measure": "Change in the Falls Efficacy Scale International (FES-I Brasil)", "time_frame": "baseline, immediately after the intervention (12 weeks) and at 6 months", "description": "The scale consists of 16 items that describe the activities of daily life and the participants should answer the level of concern of falling during these activities.", "safety_issue": "Yes"}, {"measure": "Change in the Dual task walking speed", "time_frame": "baseline, immediately after the intervention (12 weeks) and at 6 months", "description": "To assess the attentional demand during walking, we will use the test of usual walking speed in a 4.6 meters path with dual task. The participant will be asked to tell the evaluator an important fact of their past (the happiest day of his life, for example) along the way while walking.", "safety_issue": "Yes"}]
cd359a56c95442d4a5f78034be23e9de	nct	NCT02332681	{"others": null}	2015-01-05	Osteoporosis and Knee Insufficiency Fracture	Osteoporosis is a systemic bone disease characterized by low bone mass and\n      microarchitectural deterioration of bone tissue with consequent bone fragility and\n      susceptibility to fracture. Fifty percent of women and 20% men older than 50 y.o. will have\n      an osteoporotic fracture (fragility fracture). Fragility fracture is defined as one that\n      results from a low-energy trauma such as a fall from body height. A previous fracture is an\n      important predictor of a new fracture, especially in the first 5 years after initial\n      fracture. A second fracture can be particularly devastating if it is a hip fracture. Low\n      bone mineral density, measured by bone densitometry, as well as a previous osteoporotic\n      fracture, are the two major risk factors for the occurrence of a new fracture.\n\n      A more rational approach currently used to minimize the costs of health care in a shorter\n      period of time uses the strategy of firstly preventing the occurrence of secondary fracture,\n      followed by primary prevention strategies. In this context, correct identification of\n      fragility fractures and consequent treatment of those individuals is imperative. There are\n      currently insufficient data about the epidemiology and evolution of other fragility\n      fractures, also known as non-vertebral non-hip fracture (NVNH). Among these, distal radius\n      fracture and proximal humerus fractures are the most frequent. There is a type of fracture,\n      however, that is simply ignored by the medical community: the knee insufficiency fracture.A\n      possible explanation for this information gap could be the fact that, until a few years ago,\n      this entity was believed to be a osteonecrosis of the knee. Only recently it is becoming\n      clear that the cause of pain and marrow bone edema that occur subtly in older individuals\n      is, in fact, a insufficiency fracture. The perception that this lesion is actually a\n      fracture is relatively new. The knee insufficiency fracture usually occurs in older\n      individuals and those with knee osteoarthritis. This study therefore aims to evaluate\n      whether there is a relation between knee insufficiency fracture and osteoporosis. Moreover,\n      it is expected to find out if this fracture may be defined as a fragility fracture, electing\n      the individuals affected by it to a prophylaxis for the occurrence of new osteoporotic\n      fracture.	Osteoporosis and Knee Insufficiency Fracture	Osteoporosis is a systemic bone disease characterized by low bone mass and\n      microarchitectural deterioration of bone tissue with consequent bone fragility and\n      susceptibility to fractures. Fifty percent of women and 20% of men older than 50 y.o. will\n      have an osteoporotic fracture (fragility fracture). Fragility fracture is defined as one\n      that results from a low-energy trauma such as a fall from body height. A previous fracture\n      is an important predictor of a new fracture, especially in the first 5 years after the\n      initial fracture. A second fracture can be particularly devastating if a hip fracture.\n      Approximately 25% of individuals with hip fracture die in five years and only half of them\n      recover the pre-fracture status, meaning loss of ambulation ability and independence in\n      domestic activities. In addition, fragility fractures generate significant cost to the\n      health system - the annual cost of osteoporotic fractures in patients older than 50 years in\n      the United States is estimated at 1.3 billion dollar.\n\n      Low bone mineral density, measured by bone densitometry, as well as a previous osteoporotic\n      fracture, are the two major risk factors for the occurrence of a new fracture. A crucial\n      observation is that fracture attracts fracture, ie, individuals who had a fragility fracture\n      are twice as likely to suffer a second fracture and half of patients with a hip fracture had\n      previously broken another bone. Therefore, a more rational approach currently used to\n      minimize the costs of health care more effectively and in a short time uses firstly the\n      strategy of preventing the occurrence of secondary fracture, followed by primary prevention\n      strategies. In this context, the correct identification of fragility fractures and the\n      consequent treatment of individuals makes it imperative. However, it is surprising and\n      discouraging the information that despite the huge range of currently available treatments,\n      most patients who sustain a fragility fracture does not receive treatment.\n\n      Vertebral fractures and hip has undoubtedly the greatest impact on walking ability of the\n      elderly, and great attention is given to these two types of fracture. Consequently, there\n      are currently insufficient data on the epidemiology and evolution of other fragility\n      fractures, also known as non-vertebral non-hip fracture (NVNH). Among these, distal radius\n      and proximal humerus fractures are the most frequent. There is a type of fracture, however,\n      that is simply ignored by the medical community: the knee insufficiency fracture. The fact\n      that no literature study even hypothesize that this type of fracture may be a fragility\n      fracture may be because, until a few years ago, it was believed that this entity was a\n      osteonecrosis of the knee. The knee insufficiency fracture usually occurs in older\n      individuals and those with knee osteoarthritis. This study therefore aims to evaluate\n      whether a relation between the knee insufficiency fracture and osteoporosis. Moreover, it is\n      expected to find out if this fracture may be defined as a fragility fracture, electing the\n      individuals affected by it to a prophylaxis for the occurrence of new osteoporotic fracture.\n\n      BACKGROUND\n\n      The knee insufficiency fracture usually occurs in older individuals and those with knee\n      osteoarthritis. Currently no literature study even suggests the hypothesis that this type of\n      fracture may be a fragility fracture. A possible explanation for this information gap could\n      be the fact that, until a few years ago, this entity was believed to be a osteonecrosis of\n      the knee. Only recently it is becoming clear that the cause of pain and marrow bone edema\n      that occur subtly in older individuals is, in fact, a insufficiency fracture. This study\n      therefore aims to evaluate whether a relation between the knee insufficiency fracture and\n      osteoporosis. Moreover, it is expected to find out if this fracture may be defined as a\n      fragility fracture, electing the individuals affected by it to a prophylaxis for the\n      occurrence of new osteoporotic fracture.\n\n      OBJECTIVES\n\n      The objective of this study is to evaluate whether there is a relationship between the knee\n      insufficiency fracture and osteoporosis.\n\n      EXPECTED FINDINGS\n\n      Patients with knee insufficiency fracture have a higher prevalence of osteoporosis than the\n      general population.\n\n      Patients with knee insufficiency fracture have a higher risk of having a second osteoporotic\n      fracture	Recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  patients who seek orthopedics service with sudden onset of pain in the knee;\\n\\n          -  age of 45 y.o. or more\\n\\n          -  acceptance by signing the informed consent form.\\n\\n        Exclusion Criteria:\\n\\n          -  acute trauma of knee\\n\\n          -  other etiologies (post-traumatic, infectious, inflammatory diseases)\\n\\n          -  pregnant women"}, "study_pop": {"textblock": "patients older than 45 years, with sudden joint line knee pain without high trauma\\n        history, with or without a history of osteoarthritis and / or osteoporosis."}, "maximum_age": "N/A", "minimum_age": "45 Years", "sampling_method": "Non-Probability Sample", "healthy_volunteers": "No"}	300	2014-12-01	Observational	Observational Model: Cohort, Time Perspective: Prospective	N/A	[{"measure": "New fracture", "time_frame": "12 months", "description": "Occurrence of a new fragility fracture", "safety_issue": "No"}]	[{"measure": "Bone Mineral Density", "time_frame": "12 months", "description": "Evolution of bone mineral density results", "safety_issue": "No"}]
89d86c6d50b943f783b2a43f3cba28df	nct	NCT02333266	{"others": null}	2014-12-17	Bio-assay Development and Implementation for Fungal Infection Detection	The purpose of this study is to determine whether the newly developed biosensor can be used\n      to detect and quantify fungal cells in human blood samples.	Bio-assay Development and Implementation for Fungal Infection Detection	The study discussed here is part of a broader research project (IOF project) that is aimed\n      at the development and implementation of a point-of-care devices, in which Fiber-Optic\n      Surface Plasmon Resonance (FO-SPR) is used as a detection system. This project includes the\n      development and implementation of the (FUNGDETECT) sensor for fast and accurate detection of\n      fungal pathogens in human blood samples. In first instance, the sensor will be tested in\n      buffer solutions spiked with a known amount of Candida albicans cells. Further validation of\n      the prototype includes detection of these cells in human blood samples. In a first\n      experiment, detection of yeast cells will be performed in blood samples from 5 healthy\n      volunteers each spiked with yeast cells from different Candida spp.. A second experiment\n      includes the detection in blood samples from 15 patients who suffer from a candidemia. The\n      blood samples will be collected from patients of University Hospitals (UZ) Leuven.	Not yet recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Healthy volunteers for validation of the (FUNGDETECT) sensor (Spiked blood samples)\\n\\n          -  Candidemia\\n\\n        Exclusion Criteria:"}, "study_pop": {"textblock": "Patients laying in the hospital that suffer from a candidemia."}, "maximum_age": "N/A", "minimum_age": "18 Years", "sampling_method": "Non-Probability Sample", "healthy_volunteers": "Accepts Healthy Volunteers"}	15	2015-02-01	Observational	Observational Model: Case-Only, Time Perspective: Prospective	N/A	[{"measure": "Detection of Candida albicans with the newly developed FUNGDETECT sensor in blood samples from patients with candidemia due to Candida albicans", "time_frame": "Blood samples will be collected at baseline from patients directly after informed consent is given", "description": "Patients in the hospital and suspected to have a Candida infection will be tested for Candida infections via blood cultures. Blood samples for patients with a positive test will be taken immediately after the positive result and used to validate the FUNGDETECT sensor.", "safety_issue": "No"}]	[]
b264cf2293df4b24adf4d53ab94ff6c2	nct	NCT02330939	{"others": null}	2015-01-01	Fats And Carbohydrates Quality on Postprandial glycemIc Response in Type 1 Diabetes	The purpose of this study is to determine whether dietary fats may affect postprandial\n      glycemic response differently according to their quality, and these effects may differ\n      whether they are assumed in the context of meals with high or low glycemic index in patients\n      with type 1 diabetes. This interaction between quality of fat and glycemic index of\n      carbohydrates may have clinical implication for the calculation of prandial insulin dose in\n      these patients.	Impact of Fats And Carbohydrates Quality on Postprandial glycemIc Response in People With Type 1 diabEtes on Insulin Pump (FACILE Study)	\N	Active, not recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n        -Type 1 diabetes treated by insulin pump\\n\\n        Exclusion Criteria:\\n\\n          -  Pregnancy\\n\\n          -  Celiac disease"}, "maximum_age": "70 Years", "minimum_age": "18 Years", "healthy_volunteers": "No"}	14	2014-06-01	Interventional	Allocation: Randomized, Intervention Model: Crossover Assignment, Masking: Open Label, Primary Purpose: Diagnostic	N/A	[{"measure": "postprandial incremental glucose AUC", "time_frame": "6 hours", "safety_issue": "No"}]	[]
3d331c8ffb334c369ff0b954d64416d5	nct	NCT02333279	{"others": ["snctp000000587"]}	2014-12-18	Cancer Development In Organ Transplant Recipients	The investigators will determine the cancer risk in organ transplant recipients compared to\n      the general population with the help of statistical analysis. Secondly the investigators\n      will try to characterize the different cancer types.	Cancer Development In Organ Transplant Recipients	This cohort analyses will focus on incident and recurrent cases of development of non-skin\n      cancer over time. We will consider time to first formation of non-skin solid cancer after\n      solid organ transplantation as well as the cumulative number of non-skin solid cancer\n      formation over time. Both aspects are equally important and will be reflected in the\n      analytic methods of this study. Theses analyses will be restricted to the most prevalent\n      transplantation types of heart, kidney, liver, and lung.	Recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n        We will select all patients within the STCS based on the date of the first solid organ\\n        transplantation. Patients with multiple organ transplantations will be included as well.\\n        Patients contribute to the study observation time until death or end of follow-up due to\\n        other reasons.\\n\\n        Exclusion Criteria:\\n\\n        We will exclude patients with non-solid organ transplantation (e.g. hematopoietic stem\\n        cell transplantation), because the detailing of information in the STCS is insufficient to\\n        allow for detailed analysis of cancer development and control of relevant confounders. We\\n        will exclude"}, "study_pop": {"textblock": "All solid organ transplant recipients in Switzerland since 2008 who have given their\\n        consent to be included in the study."}, "maximum_age": "N/A", "minimum_age": "N/A", "sampling_method": "Probability Sample", "healthy_volunteers": "No"}	4000	2008-05-01	Observational [Patient Registry]	Observational Model: Cohort, Time Perspective: Prospective	N/A	[{"measure": "Number of solid cancers", "time_frame": "Ten Year followup", "safety_issue": "No"}]	[]
ce125881b9ce40d9afbb7ee749283a06	nct	NCT02331641	{"others": null}	2014-12-29	Multiple Minor Hepatectomies Versus Major or Extended Hepatectomies for Colorectal Liver Metastases.	The performance of multiple minor hepatectomies (MMH) instead of major hepatectomies (MH) in\n      patients with colorectal liver metastases (CLM) is object of debate. We build a study, using\n      the propensity score matched analysis, to compare the short- and long-term outcome of the\n      tow groups of patients.	Multiple Minor Hepatectomies Versus Major or Extended Hepatectomies for Colorectal Liver Metastases. A Propensity Score-matched Dual-institution Analysis.	The aim of this study is to investigate the outcome of patients with colorectal liver\n      metastases (CLM) undergoing multiple minor hepatectomies (MMH) instead of major\n      hepatectomies (MH). Indeed, the performance of MMH versus MH in patients with CLM is object\n      of debate. For this purpose, the databases at two independent institutions were\n      retrospectively reviewed. To control for confounding variable distributions, a propensity\n      score-matched analysis 1:1 was performed, and the nearest neighbor-matching method with\n      caliper distance of 0.01 was used. Among 554 patients, 110 patients undergoing MMH and 110\n      undergoing MH were matched. They were similar in baseline characteristics, comorbidities,\n      features of the primary tumors, and CLM. Primary outcomes were short- and long-term outcome.	Completed	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Diagnosis of CLM\\n\\n        Exclusion Criteria:\\n\\n          -  Uncertain diagnosis\\n\\n          -  Lost at follow-up"}, "study_pop": {"textblock": "Patients with colorectal liver metastases (CLM) that underwent hepatectomy."}, "maximum_age": "N/A", "minimum_age": "18 Years", "sampling_method": "Non-Probability Sample", "healthy_volunteers": "No"}	\N	2005-01-01	Observational	Observational Model: Case Control, Time Perspective: Retrospective	N/A	[{"measure": "Number of postoperative complications after MH or MMH, graded based on the Dindo's classification (Dindo et al. Ann Surg 2004;240:205-13)", "time_frame": "up to 90 days after surgery", "safety_issue": "Yes"}]	[{"measure": "Long-term outcome (overall and disease-free survival)", "time_frame": "10 years", "description": "Typical follow-up after surgery (until death and evidence of recurrence)", "safety_issue": "No"}]
a3f2a4c44c0c4104a0b228a675f241fd	nct	NCT02333318	{"others": null}	2014-12-24	A Single Ascending Dose Escalation to Investigate Safety and PK of VVZ-149 Injection in Healthy Older Male Volunteers	The objective of this study is to investigate the safety, tolerability and pharmacokinetics\n      (PK) of VVZ-149 injection after a single dose or loading/maintenance dose in healthy older\n      male volunteers.	A Single Ascending Dose Escalation Clinical Trial to Investigate Safety and Pharmacokinetics of VVZ-149 Injection in Healthy Older Male Volunteers	VVZ-149 injection, an investigational product (IP) in this clinical study, is a multi-target\n      analgesic drug candidate against glycine transporter type II (GlyT2) and serotonin receptor\n      2A (5HT2A). The target receptors have been known to play important roles in the induction\n      and transmission of pain signals in the pain-related neural system. There have been efforts\n      to develop new drugs that selectively antagonize the GlyT2 or 5HT2A, but it was unsuccessful\n      due to limitations of single-target drugs. VVZ-149 showed morphine-comparable analgesic and\n      gabapentin-comparable anti-allodynic effects in various rat models of pain.	Completed	{"gender": "Male", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          1. Subjects who voluntarily agree to participate and sign an IRB-approved informed\\n             consent form (ICF) prior to receiving any of the screening procedures\\n\\n          2. Healthy male subjects aged between 50-84, inclusive at screening (the subjects aged\\n             65 years or over can participate only in the single dose trial)\\n\\n          3. Subjects with body weights between 50-90 kg, inclusive and with body mass index (BMI)\\n             between 18.0-29.9 kg/m2, inclusive\\n\\n          4. Healthy subjects satisfying eligibility at screening (medical histories, physical\\n             examination, vital sign, electrocardiogram (ECG), hematology, clinical chemistry and\\n             urinalysis)\\n\\n          5. Subjects who willing to use an medicinal allowed method of contraception or sterility\\n             during the study period\\n\\n        Exclusion Criteria:\\n\\n          1. Subjects who have a presence or history of clinically significant hepatic, renal,\\n             neurologic, immunologic, pulmonary, endocrine, hematological, neoplastic,\\n             cardiovascular or psychiatric (e.g. mood disorders or obsessive-compulsive disorder)\\n             diseases (subjects with currently well-controlled conditions including hypertension,\\n             hyperlipidemia, arthritis, prostatic hypertrophy and cataracts may allow to\\n             participate at the discretion of the investigator.)\\n\\n          2. Subjects with chronic infection or meaningful acute infection\\n\\n          3. Subjects who have a history of clinically significant hypersensitivities or\\n             hypersensitivities to the ingredient of same family with IP and other drug (e.g.\\n             aspirin and antibiotics)\\n\\n          4. Subjects who have a family history of chronic pain or with a first-degree relative\\n             with chronic pain\\n\\n          5. Subjects who have a clinically significant ECG abnormalities or QTc interval >450 ms\\n\\n          6. Subjects who meet the following criteria at screening:\\n\\n               -  AST or ALT level > 3 times the upper limit of the normal range\\n\\n               -  Calculated eGFR by MDRD equation < 60 ml/min\\n\\n               -  Platelets ≤ 75,000/mm3, Hemoglobin ≤ 9 g/dL, Neutrophils absolute ≤ 1000/mm3\\n\\n          7. Subjects who show the following vital signs at the screening:\\n\\n               -  Systolic Blood Pressure (SBP): <92 mmHg or >160 mmHg\\n\\n               -  Diastolic Blood Pressure (DBP): <50 mmHg or >95 mmHg\\n\\n          8. Subjects who have a history of drug abuse or a positive urine screening for drug\\n             abuse\\n\\n          9. Subjects who have taken any prescribed or herbal medicine within one week before the\\n             first administration of the IP or any non-prescribed medicine or vitamin supplement\\n             within three days before the first administration of the IP (if all other conditions\\n             are satisfied, these subjects may be eligible for the trial as judged by the\\n             investigator)\\n\\n         10. Subjects who have participated in any other clinical trial within two months before\\n             the first administration of the IP\\n\\n         11. Subjects who have donated a unit of whole blood within two months or blood components\\n             within one month before the first administration of the IP, or who have received\\n             blood transfusion within one month before the first administration of the IP\\n\\n         12. Subjects who consume more than 21 units of alcohol per week (1 unit = 10 g of pure\\n             alcohol) or who are unable to abstain from drinking throughout the trial\\n\\n         13. Smokers who consume more than average of 10 cigarettes per day over the past three\\n             months or who are unable to abstain from smoking throughout the trial\\n\\n         14. Subjects who consume or are unable to abstain from products containing caffeine (e.g.\\n             coffee, green tea, black tea and sodas) within 24 hours before the first\\n             administration of the IP and until discharge from the hospital\\n\\n         15. Subjects judged ineligible for the study by the investigator for reasons of medical,\\n             psychological, social and geographical conditions causing poor study compliance"}, "maximum_age": "85 Years", "minimum_age": "50 Years", "healthy_volunteers": "Accepts Healthy Volunteers"}	\N	2014-07-01	Interventional	Allocation: Randomized, Intervention Model: Parallel Assignment, Masking: Double Blind (Subject, Investigator, Outcomes Assessor), Primary Purpose: Health Services Research	Phase 1	[{"measure": "Dose-limiting toxicity and maximum tolerated dose", "time_frame": "8 day", "description": "Any Common Toxicity Criteria for Adverse Effects grade 3 or more adverse event , All significant toxicity judged by the investigator", "safety_issue": "Yes"}]	[{"measure": "Safety and Tolerability as measured by Adverse event, physical examination, vital signs, 12-lead ECG, consecutive ECG, SpO2 monitoring and Clinical laboratory.", "time_frame": "8 day", "description": "Adverse event, physical examination, vital signs, 12-lead ECG, consecutive ECG, SpO2 monitoring, Clinical laboratory", "safety_issue": "Yes"}]
ef0fbc6785604dc48fe73278f7a47dda	nct	NCT02331654	{"others": null}	2014-12-16	Spinal Direct Current Stimulation Effects on Pain in Multiple Sclerosis	Pain represents one of the most common symptoms of Multiple Sclerosis (MS) that can\n      seriously affect patient health-related quality of life.\n\n      Central neuropathic pain, the main form of pain in MS patients, represents a significant\n      clinical problem, in consideration of its poorly responsiveness to available therapies.\n\n      Direct Current Stimulation (tDCS) is a non-invasive, well-tolerated procedure with an high\n      and well documented neuromodulation activity at Central Nervous System (CNS) level. First\n      evidences obtained by animal, neurophysiological and clinical studies suggested its\n      potential efficacy in neuropathic pain treatment.\n\n      In particular spinal DCS (sDCS) has been proven to modulate Nociceptive Withdrawal Reflex\n      (NWR), an objective and sensitive tool to explore pain processing at the Spinal Level and\n      recommended by European Federation of Neurological Society (EFNS) to evaluate the analgesic\n      effect of treatments. In this order of view the investigators' objective is to investigate\n      sDCS efficacy in MS neurophatic pain treatment applying validated clinical scales,\n      neurophysiological acquisitions and specific biological marker dosages.	Spinal Direct Current Stimulation Effects on Pain in Multiple Sclerosis: Clinical and Neurophysiological Assessment and Evaluation of Endocannabinoid System Activity	The investigators plan to recruit, at the IRCCS Neurological National Institute C. Mondino,\n      60 consecutive patients with definite Multiple Sclerosis (MS) according to 2005 McDonald\n      criteria in a follow-up procedure that includes a general and neurological evaluation scored\n      according to the Expanded Disability Status Scale of Kurtzke and its functional systems.\n\n      Relapsing-remitting (RR), secondary-progressive (SP) and primary-progressive (PP) MS\n      patients, affecting by neuropathic or nociceptive chronic pain conditions in accord to 1994\n      International Association for the Study of Pain (IASP)classification, will be recruited.\n      Patients complaining any form of headache will be excluded by the study. The investigators\n      will excluded also patients with cognitive impairment (Minimental State Examination - MMSE-\n      <= 21) and psychiatry diseases, in particular depression (Back Depression Inventory Scale -\n      BDI - >15).\n\n      Characteristic and intensity of pain symptoms will be collected respectively with validated\n      Italian version of Neuropathic Pain Symptoms Inventory Scale (NPSI) and Numerical Rating\n      Scale (NRS). Spasticity of lower legs, if present, will be clinical assessed with Ashworth\n      Scale and Neurophysiologically evaluated with H/M ratio and Vibratory Inhibition of\n      H-Reflex.\n\n      Health-Related Quality of Life (HRQoL) will be assessed by means of the Medical Outcome\n      36-item Short Form Health Survey (SF-36) whereas the presence and severity of fatigue will\n      be assessed by means of the Fatigue Severity Scale (FSS).\n\n      RR patients will be evaluated in stationary phase of the disease that is at least two months\n      after the last clinical relapse and at least one month after the end of a steroidal\n      treatment.\n\n      Patients will be consecutive enrolled in the study and randomly assigned to two group: 1.\n      Sham and 2. Anodal Spinal Direct Current Stimulation Treatment, in a double-blind, placebo\n      controlled study design.\n\n      Before enrollment, the study protocol will be explained to each subject, and informed\n      written consent will be obtained.\n\n      The investigators will proceed as follow:\n\n        1. Time of enrollment - T0 First Day\n\n             -  Complete clinical evaluation with administration of MMSE and BDI for exclusion\n                criteria\n\n             -  Randomized assignment to Anodal or Sham treatment group\n\n             -  Administration of NPSI, SF-36, HRQoL e FSS\n\n             -  Evaluation of Somatosensory Evoked Potential by Posterior Tibial and Medial Nerve\n                stimulation to investigate the somatosensory pathway involvement.\n\n             -  Clinical and Neurophysiological evaluation of Spasticity (if present): Ashworth\n                Scale and H/M ratio and HReflex Vibratory Inhibition.\n\n             -  Collection of blood sample to evaluate activity of Fatty Acid Amide Hydrolase\n                (FAAH) in platelets.\n\n           Second Day\n\n             -  First Anodal or Sham Direct Current Stimulation Treatment Session (sDCS)\n\n             -  Neurophysiological acquisition of Nociceptive Withdrawal Reflex (NWR) and NWR\n                Temporal Summation (see 'Neurophysiological Acquisition' Session for details)\n                before and after 30 and 60 minutes the first sDCS treatment\n\n        2. sDCS Treatment After evaluation at T0 patients will undergo 10 daily sDCS treatment, 5\n           days a week (see sDCS treatment session for details).\n\n        3. Evaluation after 10 days of treatment - T1\n\n             -  Administration of NPSI, SF-36, HRQoL e FESS\n\n             -  Clinical and Neurophysiological evaluation of Spasticity (if present): Ashworth\n                Scale and H/M ratio and HReflex Vibratory Inhibition.\n\n             -  Collection of blood sample to evaluate activity of Fatty Acid Amide Hydrolase\n                (FAAH) in platelets.\n\n             -  Neurophysiological acquisition of Nociceptive Withdrawal Reflex (NWR) and NWR\n                Temporal Summation\n\n        4. Evaluation after 1 month from the end of treatment - T2\n\n             -  Administration of NPSI, SF-36, HRQoL e FESS\n\n             -  Clinical and Neurophysiological evaluation of Spasticity (if present): Ashworth\n                Scale and H/M ratio and HReflex Vibratory Inhibition.\n\n             -  Collection of blood sample to evaluate activity of Fatty Acid Amide Hydrolase\n                (FAAH) in platelets.\n\n             -  Neurophysiological acquisition of Nociceptive Withdrawal Reflex (NWR) and NWR\n                Temporal Summation	Recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Relapsing-remitting (RR), secondary-progressive (SP) and primary-progressive (PP) MS\\n             patients, affected by neuropathic or nociceptive chronic pain conditions in\\n             accordance to 1994 IASP (International Association for the Study of Pain)\\n             classification\\n\\n        Exclusion Criteria:\\n\\n          -  Any form of headache\\n\\n          -  Cognitive impairment (Minimental State Examination <= 21)\\n\\n          -  Psychiatry diseases, in particular depression (Back Depression Inventory Scale >15)"}, "maximum_age": "N/A", "minimum_age": "18 Years", "healthy_volunteers": "No"}	60	2013-11-01	Interventional	Allocation: Randomized, Endpoint Classification: Safety/Efficacy Study, Intervention Model: Parallel Assignment, Masking: Double Blind (Subject, Investigator), Primary Purpose: Treatment	N/A	[{"measure": "sDCS efficacy in pain as determined by NPSI and NRS scale", "time_frame": "30 days", "description": "Spinal DCS (sDCS) has been proven to modulate Nociceptive Withdrawal Reflex (NWR), an objective and sensitive tool to explore pain processing at the Spinal Level and recommended by European Federation of Neurological Society (EFNS) to evaluate the analgesic effect of treatments.", "safety_issue": "No"}]	[{"measure": "Central endocannabinoid level as determined by Activity of Fatty Acid Amide Hydrolase (FAAH) in platelets", "time_frame": "30 days", "description": "The endocannabinoid system is involved in descending central pain control and can be modulated by other neurostimulation techniques as transcutaneous electrical nerve stimulation. The investigators suppose that one of the major effect of sDCS is to modulate supraspinal central pain control through activation of endocannabinoid system inducing the analgesic effect. Alteration of endocannabinoid system activity is also involved in other pathological aspects of Multiple Sclerosis as spasms, spasticity and incontinence and to acute and chronic neurodegeneration (anti-oxidant activity and inhibition of glutamate release and signalling). Activity of Fatty Acid Amide Hydrolase (FAAH) in platelets will be quantify.", "safety_issue": "No"}, {"measure": "Spasticity as determined by Ashworth Scale", "time_frame": "30 days", "description": "As sDCS reduces NWR area and as it may modulate endocannabinoid system, the investigators could suppose other positive effects of this treatment in Multiple Sclerosis patients as reduction of painful spasms and spasticity. The investigators will evaluate the effect of sDCS on spasticity, if present, investigating its effect on validate ad hoc scales (Ashworth scale) and on neurophysiological acquisitions (H reflex).", "safety_issue": "No"}]
ef64787040504d2f985625b8527c3cca	nct	NCT02333409	{"others": null}	2014-12-23	Acupuncture for Pain Control in Patients With Inoperable Pancreatic Cancer	Pancreatic cancer is the sixth most common cause of cancer death in Hong Kong. Patients\n      suffering from pancreatic cancer are associated with a poor prognosis and survival of less\n      than one year is expected in inoperable tumours (1). Management of these patients would be\n      towards palliation of symptoms. Severe pain occurs in 50 to 70% of the patients and this\n      "intractable" pain is often difficult to treat (2). Pain management is a major part of the\n      comprehensive therapy in patients with pancreatic cancer, and it also affects their quality\n      of life. Electroacupuncture seems to be a promising way to control the cancer pain and\n      reduce the dose and side effects of pain killers including opioid. This study aimed to\n      investigate the efficacy and safety of electroacupuncture in reducing pancreatic cancer pain\n      in patients suffering from inoperable pancreatic cancer.	Electroacupuncture Analgesia in Patients With Inoperable Pancreatic Cancer: A Randomized, Sham-controlled Study	Patients suffering from pancreatic cancer are associated with a poor prognosis and survival\n      of less than one year is expected in inoperable tumours. Management of these patients would\n      be towards palliation of symptoms. Severe pain occurs in 50 to 70% of the patients and this\n      "intractable" pain is often difficult to treat. Pain management is a major part of the\n      comprehensive therapy in patients with pancreatic cancer, and it also affects their quality\n      of life. Different pharmacological agents have been used in the past to control this pain\n      and these include non-steroidal anti-inflammatory drugs and narcotic agents. However, these\n      agents are associated with their own adverse effects and may further impair quality of life.\n      Radiotherapy and celiac plexus neurolysis also can relieve the cancer pain, patients'\n      responses are often variable and difficult to predict.\n\n      Recently, more and more studies were focused on the acupuncture for cancer pain.\n      Electroacupuncture (EA) analgesia seems to be a promising way to control the cancer pain and\n      reduce the dose and side effects of analgesics. The latest review in 2012 showed that\n      acupuncture might be an effective analgesic adjunctive method for cancer pain after\n      concluding the results of 15 randomized-control trials. Nevertheless, studies focused on\n      patients with pancreatic cancer and results from randomized trials are lacking.\n\n      This study aims to investigate the efficacy and effectiveness of EA analgesia for patients\n      with inoperable pancreatic cancer.	Not yet recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          1. All patients ≥ 18 years old with cytology or histology confirmed pancreatic cancer\\n\\n          2. Abdominal pain typical for pancreatic cancer\\n\\n          3. Inoperability of pancreatic cancer as demonstrated by computed tomography (CT),\\n             positron emission tomography (PET) scan or endoscopic ultrasonography (EUS).\\n\\n          4. Informed consent available\\n\\n        Exclusion Criteria:\\n\\n          1. Patients who are allergic to the acupuncture needles\\n\\n          2. Coagulopathy (prolongation of prothrombin time > 18 sec, thrombocytopenia <80,000\\n             platelets/ml)\\n\\n          3. Another cause for abdominal pain such as pseudocyst, ulcer or other intra-abdominal\\n             disorder\\n\\n          4. Had been treated by acupuncture for pancreatic cancer within 1 year\\n\\n          5. Potential patient noncompliance (refusing to follow schedule of events)\\n\\n          6. Active alcohol or other drug use or significant psychiatric illness\\n\\n          7. Expected survival less than 3 months\\n\\n          8. Unable to give informed consent"}, "maximum_age": "N/A", "minimum_age": "N/A", "healthy_volunteers": "No"}	60	2015-03-01	Interventional	Allocation: Randomized, Endpoint Classification: Safety/Efficacy Study, Intervention Model: Parallel Assignment, Masking: Double Blind (Subject, Caregiver, Outcomes Assessor), Primary Purpose: Treatment	Phase 3	[{"measure": "pain scores in numeric rating scale (NRS)", "time_frame": "1 Month after Procedure", "description": "Pain Score", "safety_issue": "No"}]	[{"measure": "Procedural discomfort", "time_frame": "Day 0 after procedure", "description": "Discomfort feeling on visual analog scale (from 0 which implies no discomfort at all, to 100 which implies the worst discomfort imaginable)", "safety_issue": "No"}, {"measure": "Willingness to repeat procedure", "time_frame": "1 Month after Procedure", "description": "Patient's willingness to repeat the procedure", "safety_issue": "No"}, {"measure": "Morbidities related to the procedures", "time_frame": "1 Month after Procedure", "description": "Morbidities related to the procedures", "safety_issue": "No"}, {"measure": "Quality of Life scores", "time_frame": "1 Month after Procedure", "description": "Quality of Life", "safety_issue": "No"}]
9802d765c6744a949123c3f21415213a	nct	NCT02331693	{"others": null}	2015-01-02	CAR T Cells in Treating Patients With Malignant Gliomas Overexpressing EGFR	The purpose of this study is to determine whether autologous T cells bearing chimeric\n      antigen receptor that can specifically recognize EGFR overexpressed in tumor cells is safe\n      and effective for patients with EGFR-overexpressing malignant glioma.	Genetically Modified T Cells in Treating Patients With Malignant Gliomas Overexpressing EGFR	BACKGROUND:\n\n      - Patients with advanced gliomas have very limited treatment options. Epidermal Growth\n      Factor Receptor (EGFR) is often amplified in patients with glioblastoma (GBM) and has been\n      regarded a suitable target for GBM treatment.\n\n      The investigators have constructed lentiviral vector that contains a chimeric antigen\n      receptor (CAR) that recognizes overexpressed EGFR in tumor cells but not EGFR in normal\n      cells, which can be used to mediate genetic transfer of this CAR with high efficiency\n      without the need to perform any selection.\n\n      OBJECTIVES:\n\n      Primary Objectives To evaluate the safety of the administration of anti-EGFR CAR engineered\n      T lymphocytes in patients receiving the non-myeloablative conditioning regimen, and\n      aldesleukin\n\n      Secondary objectives To determine whether the glioma will regress after the patients receive\n      anti-EGFR CAR-engineered T lymphocytes and aldesleukin following a nonmyeloablative but\n      lymphoid depleting preparative regimen.\n\n      ELIGIBILITY:\n\n      Histologically proven glioblastoma or glisarcoma overexpressing EGFR as determined by IHC,\n      Western blot, FISH or RT-PCR.\n\n      Failed prior standard treatment with radiotherapy with or without chemotherapy. Cardiac,\n      pulmonary and laboratory parameters within acceptable limits\n\n      DESIGN:\n\n      The study will be conducted using a Phase I design. Patients will receive a\n      non-myeloablative but lymphocyte depleting preparative regimen consisting of\n      cyclophosphamide and fludarabine followed by intravenous infusion of ex vivo tumor reactive,\n      CAR gene-transduced T cells, plus IV aldesleukin.\n\n      A total of 10 patients may be enrolled over a period of 1-2 years.	Recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          1. Patients with histologically proven glioblastomas or gliosarcomas that overexpress\\n             EGFR as assessed by IHC, FISH, western blot or RT-PCR.\\n\\n          2. Patients must have progression of disease after radiotherapy (including patients that\\n             undergo surgery for recurrent disease and are rendered NED). This includes recurrent\\n             GBM after receiving all standard first-line treatment, including surgery (if feasible\\n             due to neurosurgical and neuro-anatomical considerations) and adjuvant radiotherapy\\n             +/- chemotherapy.\\n\\n          3. Patients must either not be receiving steroids, or be on a stable dose of steroids\\n             for at least five days prior to registration.\\n\\n          4. Patients must be greater than or equal to 18 years of age and less than or equal to\\n             age 70, and must have a life expectancy > 8 weeks\\n\\n          5. Patients must be able to understand and sign the Informed Consent Document\\n\\n          6. Must be willing to sign a durable power of attorney.\\n\\n          7. Patients of both genders must be willing to practice birth control for four months\\n             following treatment.\\n\\n          8. Women of child bearing potential must have a negative pregnancy test because of the\\n             potentially dangerous effects of the treatment on the fetus.\\n\\n          9. Serology:\\n\\n             Seronegative for HIV antibody. (The experimental treatment being evaluated in this\\n             protocol depends on an intact immune system. Patients who are HIV seropositive can\\n             have decreased immune-competence and thus be less responsive to the experimental\\n             treatment and more susceptible to its toxicities.) Seronegative for hepatitis B\\n             antigen, and seronegative for hepatitis C antibody unless antigen negative. If\\n             hepatitis C antibody test is positive, then patients must be tested for the presence\\n             of antigen by RT-PCR and be HCV RNA negative.\\n\\n         10. Hematology WBC greater than or equal to 3000/mm(3) ANC greater than or equal to\\n             1000/mm(3) without the support of filgrastim Platelet count greater than or equal to\\n             100,000/mm(3) Hemoglobin greater than or equal to 8.0 g/dl (eligibility level for\\n             hemoglobin may be reached by transfusion)\\n\\n         11. Chemistry:\\n\\n             ALT/AST less than or equal to to 2.5 times the upper limit of normal Creatinine less\\n             than or equal to to 1.6 mg/dl Total bilirubin less than or equal to to 1.5 mg/dl,\\n             except in patients with Gilbert s Syndrome who must have a total bilirubin less than\\n             3.0 mg/dl.\\n\\n         12. Patients must be at least 4 weeks from radiation therapy. Additionally, patients must\\n             be at least 6 weeks from nitrosoureas, 4 weeks from temozolomide, 3 weeks from\\n             procarbazine, 2 weeks from vincristine and 4 weeks from last bevacizumab\\n             administration. Patients must be at least 4 weeks from other cytotoxic therapies not\\n             listed above and 2 weeks for non-cytotoxic agents (e.g., interferon, tamoxifen)\\n             including investigative agents. All toxicities from prior therapies should be\\n             resolved to CTCAE less than or equal to grade 1 (except for toxicities such as\\n             alopecia, or vitiligo).\\n\\n        Exclusion Criteria:\\n\\n          1. A prior history of gliadel implantation in the past six months..\\n\\n          2. Women who are currently pregnant or breast feeding because of the potentially\\n             dangerous effects of the treatment on the fetus or infant.\\n\\n          3. Active systemic infections, coagulation disorders or other major medical illnesses\\n             including those of the cardiovascular, respiratory or immune system, myocardial\\n             infarction, cardiac arrhythmias, obstructive/restrictive pulmonary disease.\\n\\n          4. Any form of primary immunodeficiency (such as Severe Combined Immunodeficiency\\n             Disease).\\n\\n          5. Concurrent opportunistic infections (The experimental treatment being evaluated in\\n             this protocol depends on an intact immune system. Patients who have decreased immune\\n             competence may be less responsive to the experimental treatment and more susceptible\\n             to its toxicities).\\n\\n          6. History of severe immediate hypersensitivity to any of the agents including\\n             cyclophosphamide, fludarabine, or aldesleukin.\\n\\n          7. History of coronary revascularization or ischemic symptoms.\\n\\n          8. Clinically significant hemorrhagic or ischemic stroke, including transient ischemic\\n             attacks and other central nervous system bleeding in the preceding 6 months that were\\n             not related to glioma surgery. History of prior intratumoral bleeding is not an\\n             exclusion criteria; patients who with history of prior intratumoral bleeding,\\n             however, need to undergo a non-contrast head CT to exclude acute bleeding.\\n\\n          9. Other concomitant anti-cancer therapy except corticosteroids.\\n\\n         10. Any patient known to have an LVEF less than or equal to 45%."}, "maximum_age": "70 Years", "minimum_age": "18 Years", "healthy_volunteers": "No"}	10	2014-12-01	Interventional	Allocation: Non-Randomized, Endpoint Classification: Safety/Efficacy Study, Intervention Model: Single Group Assignment, Masking: Open Label, Primary Purpose: Treatment	Phase 1	[{"measure": "Adverse events attributed to the administration of the anti-EGFR CAR T cells", "time_frame": "Approximately 2 years", "safety_issue": "Yes"}]	[]
1cfc3d6219cf465ca8f1f580fc1e578d	nct	NCT02331550	{"others": null}	2015-01-03	Observational vs. Ablative Treatment for Low-grade Squamous Intraepithelial Lesions.	To evaluate the rate of regression and progression of low-grade squamous intraepithelial\n      lesion comparing expectant vs. ablative treatment.	Observational vs. Ablative Treatment for Low-grade Squamous Intraepithelial Lesions. Retrospective Paired Cohort Study.	\N	Completed	{"gender": "Female", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Diagnosis of Low-Grade Squamous Intraepithelial Lesion by cervical cytology.\\n\\n          -  Positive Biopsy for Low-Grade Squamous Intraepithelial Lesion after colposcopy.\\n\\n        Exclusion Criteria:\\n\\n          -  Serological detection of human immunodeficiency virus (HIV)."}, "study_pop": {"textblock": "Patients referred to the Colposcopic Unit of Saint Thomas Hospital for the diagnosis of\\n        Low-Grade Squamous Intraepithelial Lesions, between January 2010 and December 2013."}, "maximum_age": "N/A", "minimum_age": "N/A", "sampling_method": "Non-Probability Sample", "healthy_volunteers": "No"}	\N	2014-01-01	Observational	Observational Model: Cohort, Time Perspective: Retrospective	N/A	[{"measure": "Number of patients diagnosed with Low-Grade Squamous Intraepithelial Lesions that progressed to a higher level lesion (High Grade or cervical cancer) when evaluated at 6 and 12 months after diagnosis.", "time_frame": "12 months", "safety_issue": "No"}]	[{"measure": "Number of patients diagnosed with Low-Grade Squamous Intraepithelial Lesions that regressed to a higher level lesion (High Grade or cervical cancer) when evaluated at 6 and 12 months after diagnosis.", "time_frame": "12 months", "safety_issue": "No"}]
d8deffd078f74c89b457733561542bc1	nct	NCT02331745	{"others": null}	2014-12-24	RCT Study on Granulocyte Colony-stimulating Factor(G-CSF) Treatment of Hepatic Failure	This study evaluates the Granulocyte colony-stimulating factor (G-CSF) in the treatment of\n      Acute on Chronic Liver Failure in adult. Half participants will receive G-CSF and standard\n      treatment in combination, while half participants will receive standard treatment.	Granulocyte Colony-stimulating Factor(G-CSF) in the Treatment of Hepatic Failure: a Prospective Randomized Controlled Clinical Study	Granulocyte colony-stimulating factor (G-CSF) can be used to mobilize stem cells to the\n      periphery and the liver tissue in patients with advanced liver disease, and could promote\n      hepatic regeneration. Moreover, G-CSF was reported to protect patients from sepsis by\n      restoring the function of both neutrophils and monocytes. Therefore, G-CSF therapy may be\n      beneficial for liver regeneration in patients with ACLF induced by different causes.\n\n      standard therapy for the treatment of ACLF includes reduced glutathione, glycyrrhizin,\n      ademetionine,polyene phosphatidylcholine, alprostadil, and human serum albumin) on the day\n      of admission. HBV associated ACLF patients receive entecavir at the same time	Recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          1. age from 17ys to 70ys;\\n\\n          2. fale or femal;\\n\\n          3. ACLF, as deﬁned by the Asian Pacific Association for the Study of the Liver Working\\n             Party, is an acute hepatic insult manifested as jaundice (serum bilirubin ≥ 5 mg/dL)\\n             and coagulopathy[international normalized ratio (INR) ≥ 1.5 or prothrombin activity<\\n             40%], with complications of ascites and/or encephalopathy within 4 wk in patients\\n             previously diagnosed or undiagnosed with chronic HBV associated liver disease and\\n             alcoholic liver\\n\\n        Exclusion Criteria:\\n\\n          1. super-infection or co-infection with hepatitis A, C, D, E,Epstein-Barr virus,\\n             cytomegalovirus, or human immunodeficiency virus;\\n\\n          2. a previous course immuno-modulator or cytotoxic/immunosuppressive therapy for chronic\\n             hepatitis within the prior 12 mo;\\n\\n          3. hepato-cellular carcinoma diagnosed by computed tomography or magnetic resonance\\n             imaging;\\n\\n          4. co-existence of any other serious medical illnesses or other liver diseases such as\\n             autoimmune hepatitis, drug-induced liver injury or Wilson's disease;\\n\\n          5. any concurrent evidence of sepsis;\\n\\n          6. malignant jaundice induced by obstructive jaundice and hemolytic jaundice;\\n\\n          7. prolonged prothrombin time due to blood system disease."}, "maximum_age": "70 Years", "minimum_age": "17 Years", "healthy_volunteers": "No"}	140	2013-10-01	Interventional	Allocation: Randomized, Endpoint Classification: Safety/Efficacy Study, Intervention Model: Parallel Assignment, Masking: Open Label, Primary Purpose: Treatment	Phase 4	[{"measure": "Survival rates", "time_frame": "12 weeks", "safety_issue": "Yes"}]	[{"measure": "(Model of End Liver Disease,MELD) score", "time_frame": "at 4 weeks; and at 12 weeks", "safety_issue": "Yes"}, {"measure": "(Sepsis-related Organ Failure Assessment,SOFA) score", "time_frame": "at 4 weeks; and at 12 weeks", "safety_issue": "Yes"}, {"measure": "Total Bilirubin,TbiL", "time_frame": "at 4 weeks; and at 12 weeks", "safety_issue": "Yes"}, {"measure": "incidence of complications;including infection, HRS", "time_frame": "at 4 weeks; and at 12 weeks", "safety_issue": "Yes"}]
eb4b257db321499a9f18b975c3c856b5	nct	NCT02331758	{"others": null}	2014-12-31	The Influence Factors of Ovarian Response in PCOS Patients With IVF-ET Treatment	The purpose of this study is to explore the factors which affect ovarian response of PCOS\n      patients with IVF-ET treatment, in order to provide predictive clinical index for the\n      outcome of IVF-ET treatment in PCOS patients. After figuring out the controllable factors,\n      researchers would be able to educate PCOS patients and improve the success rate while\n      reducing the incidence of complications during the treatment at the same time.	The Influence Factors of Ovarian Response in Polycystic Ovary Syndrome Patients(PCOS) With In Vitro Fertilization and Embryo Transfer (IVF-ET) Treatment	Statistics of PCOS patients like age, BMI index and others would be collected. Through\n      distributing questionnaires and query of past cases and collecting data recorded during the\n      ovulation process like monitoring fluctuations in blood and ultrasonic monitoring results,\n      researchers obtain the risk factors of the occurence of Ovarian Hyperstimulation\n      Syndrome(OHSS) in IVF-ET treatment in PCOS patients and set up an OHSS prediction model,\n      choose controllable factors in order to make up guidance and have intervention on patients\n      with PCOS accordingly. The investigators expect this could improve the success rate of\n      IVF-ET treatment in patients with PCOS, provide clues and assist to reduce the risk of the\n      therapy.	Not yet recruiting	{"gender": "Female", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Clinical diagnosis of PCOS\\n\\n          -  Long schedule time of Luteal phase\\n\\n          -  Available to trace\\n\\n          -  Normal Prolactin level with contraceptive treatment in recent 3 months\\n\\n        Exclusion Criteria:\\n\\n          -  Unwilling to participate"}, "maximum_age": "N/A", "minimum_age": "N/A", "healthy_volunteers": "No"}	1000	2015-01-01	Interventional	Allocation: Randomized, Intervention Model: Parallel Assignment, Masking: Open Label, Primary Purpose: Supportive Care	N/A	[{"measure": "oocyte number", "time_frame": "3 Month", "description": "Affect the outcome of IVF-ET treatment", "safety_issue": "Yes"}]	[{"measure": "Success Rate", "time_frame": "3 Month", "description": "The success rate of IVF-ET treatment elevated", "safety_issue": "Yes"}, {"measure": "OHSS complication", "time_frame": "3 Month", "description": "The number of OHSS patients reduced", "safety_issue": "Yes"}]
50f63fb57e0445638b743f1c06fb1547	nct	NCT02331849	{"others": null}	2013-12-02	Esophageal Motility in Eosinophilic Esophagitis Evaluated by High Resolution Manometry.	Esophageal Motility in eosinophilic esophagitis will be evaluated by High Resolution\n      Manometry before and after medical treatment - motility is suspected to change/improve after\n      therapy.	Esophageal Motility in Eosinophilic Esophagitis Evaluated by High Resolution Manometry - Effect on Esophageal Motility of Standard Therapy.	After identification of eosinophilic inflammation of the esophagus -> differentiation\n      between GERD and eosinophilic esophagitis (via pH/MII-measurements or PPI-trial) ->\n      High-resolution manometry (HRM) for evaluation of esophageal motility in patients with\n      eosinophilic esophagitis (exclusion of GERD-patients)-> initiation of budesonide-therapy ->\n      after eight weeks of therapy reevaluation of esophageal motility by HRM	Recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n        • patients with eosinophilic inflammation of the esophagus\\n\\n        Exclusion Criteria:\\n\\n          -  refusal to participate in study\\n\\n          -  pregnancy\\n\\n          -  eosinophilic gastroenteritis\\n\\n          -  Achalasia\\n\\n          -  contraindication for gastroscopy / HRM / 24-h-pH/Impedance-monitoring\\n\\n          -  contraindication for therapy with budesonide\\n\\n          -  eosinophilic inflammation due to GERD"}, "maximum_age": "90 Years", "minimum_age": "18 Years", "healthy_volunteers": "No"}	20	2013-10-01	Interventional	Intervention Model: Single Group Assignment, Masking: Open Label	N/A	[{"measure": "Improvement of esophageal motility (IBP) measureable in high resolution manometry (HRM)", "time_frame": "Two months", "description": "Average maximum intra-bolus-pressure (IBP) [mmHg] before and after therapy", "safety_issue": "No"}]	[{"measure": "Improvement of esophageal motility (e.g. specified in the chicago classification) represented in high resolution manometry (HRM)", "time_frame": "Two months", "description": "weak peristalsis with small/large breaks, frequently failes peristalsis, absent peristalsis, hypertensive peristalsis, rapid contractions with normal latency, functional EGJ-obstruction, panesophageal pressurizations, compartimentalized pressurizations;", "safety_issue": "No"}, {"measure": "Endoscopic evaluation of inflammation before/after therapy", "time_frame": "Two months", "description": "Endoscopic assessment of esophageal signs of eosinophilic esophagitis (white exsudates, furrows, edema, rings, crepe paper, stricture", "safety_issue": "No"}, {"measure": "Symptoms before/after therapy", "time_frame": "Two months", "description": "Evaluation of symptoms via questionnaire before/after therapy", "safety_issue": "No"}]
de5b8a97b1a743baa9467ee30d1b2311	nct	NCT02331784	{"others": null}	2014-12-18	Plasticity-based Adaptive Cognitive Remediation for Alzheimer Disease	The primary objective of this study is to evaluate the effects of the experimental treatment\n      (cognitive training) further outlined in this protocol on the cognitive abilities (e.g.,\n      processing speed, attention, working memory, and executive function), brain functionality,\n      functional status and quality of life of individuals with age-related cognitive decline as\n      compared to a computer-based active control.	Plasticity-based Adaptive Cognitive Remediation for Alzheimer Disease	The normal aging has a devastating effect on our cognitive ability to learn and remember, on\n      the speed with which the investigators process information, and on our ability to reason. By\n      2050, nearly 14 million individuals in the US will be living with Alzheimer's disease (AD),\n      up from 5 million in 2013. AD is the most common cause of dementia, resulting in the loss of\n      cognitive functions such as memory, reasoning, language, and cognitive, social, physical,\n      and emotional control, to the extent that losses interfere with activities of daily living\n      and necessitate continuous monitoring and care. Many studies now show that the processing\n      machinery of the brain is plastic and remodeled throughout life by learning and experience,\n      enabling the strengthening of cognitive skills or abilities. Research has shown that brief,\n      daily computerized cognitive training that is sufficiently challenging, goal-directed and\n      adaptive enables intact brain structures to restore balance in attention and compensate for\n      disruptions in cognitive functioning. The study aims to understand how our computer program\n      can affect cognition and attention in those with aging brain.	Not yet recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          1. Age 65-79 years at the time of consent\\n\\n          2. Fluent English speakers, to ensure reasonable results neuropsychological assessments\\n\\n          3. Adequate sensorimotor capacity to perform the program, including visual capacity\\n             adequate to read from a computer screen at a normal viewing distance, auditory\\n             capacity adequate to understand normal speech, and motor capacity adequate to control\\n             a computer mouse\\n\\n          4. No evidence of dementia as indicated by Mini-Mental State Examination scores >22\\n\\n        Exclusion Criteria:\\n\\n          1. Diagnosis with Alzheimer's disease or related dementias\\n\\n          2. Requiring caregiver assistance in dressing/personal hygiene\\n\\n          3. Medical conditions predisposing to imminent functional decline\\n\\n          4. Recent participation of computer-delivered cognitive training\\n\\n          5. Diagnosis of an illness or condition with known cognitive consequences (e.g.,\\n             schizophrenia, bipolar disorder, cancer, multiple sclerosis) will be excluded due to\\n             the confound with cognitive impairment from normal aging.\\n\\n          6. Uncorrectable acuity greater than 20/40\\n\\n          7. Self-reported cardiovascular disease\\n\\n          8. Claustrophobia or any other contraindication to MRI scanning\\n\\n          9. Inability to complete a 1-hour MRI\\n\\n         10. Any implanted devices above the waist (e.g., cardiac pacemaker or\\n             auto-defibrillators, neural pacemaker, aneurysm clips, cochlear implant, metallic\\n             bodies in the eye or central nervous system, any form of wires or metal devices that\\n             may concentrate radio frequency fields)\\n\\n         11. History of brain surgery; removal of brain tissue; or history of stroke."}, "maximum_age": "79 Years", "minimum_age": "65 Years", "healthy_volunteers": "Accepts Healthy Volunteers"}	40	2015-04-01	Interventional	Allocation: Randomized, Endpoint Classification: Efficacy Study, Intervention Model: Parallel Assignment, Masking: Double Blind (Subject, Outcomes Assessor), Primary Purpose: Basic Science	N/A	[{"measure": "Changes in performance on attention", "time_frame": "Baseline and at the completion of 10 weeks of training", "description": "Change in performance on attention will be measured using the NIH toolbox attention task (Flanker Inhibitory control).", "safety_issue": "No"}, {"measure": "Changes in performance on memory", "time_frame": "Baseline and at the completion of 10 weeks of training", "description": "Change in performance on memory will be measured using the NIH toolbox memory tasks (composite score of List sorting working memory, Picuture sequence memory and Auditory Verbal learning ).", "safety_issue": "No"}, {"measure": "Changes in performance on processing speed", "time_frame": "Baseline and at the completion of 10 weeks of training", "description": "Change in performance on processing speed will be measured using the NIH toolbox processing speed task (Pattern comparison process speed ).", "safety_issue": "No"}, {"measure": "Changes in performance on executive function", "time_frame": "Baseline and at the completion of 10 weeks of training", "description": "Change in performance on executive function will be measured using the NIH toolbox executive function task (Dimensional change card sort).", "safety_issue": "No"}]	[{"measure": "Changes in brain function", "time_frame": "Baseline and at the completion of 10 weeks of training", "description": "Change in resting state functional connectivity will be measured by resting State T2*weighted EPI-BOLD, a 10-minute task-free BOLD contrast sequence consisting of 300 volumes (TR=2000 ms/TE=30ms) at 3.4mm3 in-plane resolution and 3mm slice thickness. Participants will be instructed to keep their eyes open and maintain attention on a central gray fixation cross on a black screen.", "safety_issue": "No"}, {"measure": "Changes in brain structure", "time_frame": "Baseline and at the completion of 10 weeks of training", "description": "3D T1-Weighted multi-echo MPRAGE. Morphometric analyses will be based on this MRI sequence (not accelerated because the reliability of acceleration for multi-site studies has not yet been established). We will achieve spatial resolution of 1 x 1 x 1 mm voxels.", "safety_issue": "No"}]
025d2bb5b38448c88e5bedf9ee8289a3	nct	NCT02331862	{"others": null}	2014-12-31	To Study the Effect of Adjunctive Oral Methylprednisolone Therapy in Pediatric Urinary Tract Infection	Purposes of this study will be as follows:\n\n        1. To design a prospective, randomized, and open-labeled study to investigate the effect\n           and the side effect of MPD in combination with conventional antibiotics to affect\n           clinical course, outcome, and medical expenses.\n\n        2. To compare level of the urinary and serum cytokines before and after received MPD for\n           the following sub-aim:\n\n      I. To determine the population who is benefit from MPD to reduce the severity of clinical\n      course and subsequent renal scarring.\n\n      II. To understand the mechanism by which the MPD could shorten the clinical course and\n      reduce the renal scarring.	To Study the Effect of Adjunctive Oral Methylprednisolone Therapy in Pediatric Urinary Tract Infection	The urinary tract infection (UTI) is a common etiology of the febrile children and the acute\n      pyelonephritis (APN) happen in 70% children with the first febrile UTI. After the first APN,\n      the irreversible renal scarring takes place in about 40% patients. The sequela of the renal\n      scarring includes chronic kidney disease, hypertension, the complication during the\n      pregnancy, and even the end stage of renal diseases. Due to the progression of the\n      pathophysiology of the pyelonephritis and the renal scarring in the past years, we\n      understand that the inflammation is one of the important mechanisms. Therefore, there are\n      many animal studies clarifying the role of the anti-inflammation or antioxidant to reduce\n      the renal scarring. In our previous studies, Dr. Chiou Y.Y. and colleagues has provided the\n      evidence that the adjunctive methylprednisolone (MPD) can decrease the risk of the renal\n      scarring for patients with high risk APN, which was defined as inflammatory volume more than\n      4.6 mL on technetium-99m-labeled dimercaptosuccinic acid scan or abnormal renal\n      ultrasonography results. Our study is the first human study demonstrating the solution for\n      the renal scarring. However, whether this result can be applied to the whole spectrum of the\n      UTI is still unknown. Purposes of this study will be as follows:\n\n        1. To design a prospective, randomized, and open-labeled study to investigate the effect\n           and the side effect of MPD in combination with conventional antibiotics to affect\n           clinical course, outcome, and medical expenses.\n\n        2. To compare level of the urinary and serum cytokines before and after received MPD for\n           the following sub-aim:\n\n      I. To determine the population who is benefit from MPD to reduce the severity of clinical\n      course and subsequent renal scarring.\n\n      II. To understand the mechanism by which the MPD could shorten the clinical course and\n      reduce the renal scarring.\n\n      According to these studies, we will provide a new and effective guideline to shorten disease\n      course, save medical expenses, and decrease the risk for renal scarring sequela.	Not yet recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  1week old ~ 16 years old children with UTI\\n\\n        Exclusion Criteria:\\n\\n          -  Previous UTI\\n\\n          -  Known GU tract obstruction\\n\\n          -  Severe sepsis with vital signs change\\n\\n          -  Antibiotics used"}, "maximum_age": "16 Years", "minimum_age": "N/A", "healthy_volunteers": "No"}	160	2015-01-01	Interventional	Allocation: Non-Randomized, Endpoint Classification: Efficacy Study, Intervention Model: Parallel Assignment, Masking: Open Label, Primary Purpose: Treatment	Phase 3	[{"measure": "The proportion of patients with renal scar formation", "time_frame": "6.5 months", "description": "Check the renal scar formation 6.5 months after the UTI", "safety_issue": "No"}]	[{"measure": "Duration of the hospitalization", "time_frame": "the duration patient in the hospital, may be about 5 days", "description": "Check the duration of the hospitalization", "safety_issue": "No"}, {"measure": "Expense of the hospitalization", "time_frame": "the duration patient in the hospital, may be about 5 days", "description": "Check the expense of the hospitalization", "safety_issue": "No"}]
5ef35ba17e1c48899536232b7d71702e	nct	NCT00104572	{"others": ["04-AG-N338"]}	2005-03-01	The Effects of Aromatase Inhibition and Testosterone Replacement on Sex Steroids, Pituitary Hormones, Markers of Bone Turnover, Muscle Strength, and Cognition in Older Men	Background:\n\n      - Men older than 65 years of age often produce lower levels of testosterone, meaning there\n      is less testosterone circulating to the tissues of the body. This is associated with\n      negative effects on muscle strength, bone density, sexual function, mood, and the ability to\n      think to the best of one s ability. Testosterone replacement therapy often involves\n      injections, patches, or gels that help to raise circulating testosterone levels, but these\n      therapies often have side effects because they lead to imbalance of other hormones.\n      Researchers have been studying the effectiveness of anastrozole, a drug that can lower\n      estrogen levels while simultaneously increasing testosterone levels, as a treatment for the\n      negative effects of decreased circulating testosterone levels that occur naturally with\n      aging.\n\n      Objectives:\n\n      - To evaluate whether anastrozole is as effective as testosterone gel in improving bone and\n      muscle strength, hormone levels, and brain function in men over 65 years of age.\n\n      Eligibility:\n\n      - Healthy men at least 65 years of age who have low levels of testosterone.\n\n      Design:\n\n        -  The study involves six study visits over a total of 12 months: screening, baseline, 6\n           weeks, 3 months, 6 months, and 12 months.\n\n        -  All participants will receive calcium and vitamin D supplements to take daily, and will\n           be randomized to one of three groups:\n\n        -  Testosterone gel and placebo tablet\n\n        -  Anastrozole tablet and placebo gel\n\n        -  Placebo tablet and gel\n\n      Participants will have the following tests at each specified visit:\n\n        -  Screening: Blood tests and rectal ultrasound to evaluate the prostate.\n\n        -  Baseline: Blood and urine tests; growth hormone levels, muscle strength, bone density,\n           and balance evaluation; imaging studies; cognitive testing; and questionnaires on\n           quality of life, sexual function, depression, and urinary symptoms.\n\n        -  Six weeks: Blood tests and dose adjustment of the gel or tablet.\n\n        -  Three months: Blood and urine tests; growth hormone, muscle strength, bone density, and\n           balance evaluation; and questionnaires on quality of life, sexual function, depression,\n           and urinary symptoms.\n\n        -  Six months: Blood and urine tests; muscle strength, bone density, and balance\n           evaluation; cognitive testing; and questionnaires on quality of life, sexual function,\n           depression, and urinary symptoms.\n\n        -  Twelve months: Blood and urine tests; rectal ultrasound; muscle strength, bone density,\n           and balance evaluation; imaging studies; cognitive testing; and questionnaires on\n           quality of life, sexual function, depression, and urinary symptoms.	The Effects of Aromatase Inhibition and Testosterone Replacement in Sex Steroids, Pituitary Hormones, Markers of Bone Turnover, Muscle Strength, and Cognition in Older Men	Approximately 20% of men over the age of 70 have low testosterone levels. In some studies,\n      testosterone replacement has resulted in improvement in bone mass, muscle strength, quality\n      of life and memory function. In the body, testosterone is converted into estrogen. Hence, it\n      is unclear whether these beneficial effects are due to testosterone or estrogen. Research\n      has shown that inhibition of estrogen production in men results in an increase in\n      testosterone levels.\n\n      In this study, patients will be assigned to one of three groups: one group will receive\n      testosterone gel and a placebo tablet, one group will receive a 1mg Anastrozole tablet and a\n      placebo gel, and one group will receive a placebo tablet and placebo gel. Each group will\n      receive a daily dose of calcium with vitamin D. The study requires 6 visits over a 12-month\n      period for testing and evaluation. Two of the 6 visits will require an overnight stay in the\n      hospital so that an intravenous (IV) line can be placed in the arm to allow samples to be\n      drawn throughout the night. Testing will include a cardiac stress test, a glucose tolerance\n      test, bone and muscle tests, evaluation of memory function, etc. For the safety of the\n      prostate, we will perform a prostate ultrasound at the start and end of the study and we\n      will monitor urinary symptoms, prostate specific antigen (PSA) levels and the prostate exam\n      throughout the study.	Completed	{"gender": "Male", "criteria": {"textblock": "-  INCLUSION CRITERIA:\\n\\n               1. Men age 65 years or older\\n\\n               2. Serum testosterone level less than or equal to 350 ng/dl\\n\\n               3. Subject is able to complete an informed consent\\n\\n        EXCLUSION CRITERIA:\\n\\n          1. History of Stroke\\n\\n          2. History of Dementia\\n\\n          3. History of Diabetes\\n\\n          4. Blood pressure at rest of > 155/90 mmHg. Elevated systolic or diastolic reading\\n             renders subject ineligible\\n\\n          5. Chronic medical condition, i.e. congestive heart failure\\n\\n          6. Arthritis, severe enough to prevent completion of the strength testing, history of\\n             joint replacement of knees or hip.\\n\\n          7. Inability to walk 50 meters\\n\\n          8. Known disease of the bone and/or taking medications to treat osteoporosis, i.e.\\n\\n             Fosamax, Evista, Miacalcin\\n\\n          9. History of Gastric surgery\\n\\n         10. History of prostate cancer or any other cancers, including blood dyscrasias\\n\\n         11. History of severe BPH (causing urinary problems)\\n\\n         12. History of heart attack or open-heart surgery within the past 6 months\\n\\n         13. Use of steroids within the past 3 months, including prednisone and/or cortisone\\n             injections, and inhaled steroids. Topical steroid cream is acceptable.\\n\\n         14. If you do not agree to refrain from taking the drugs Viagra, Cialis or Levitra for\\n             the duration of the study\\n\\n         15. Use of anabolic steroids, i.e. testosterone, (or any analog of testosterone) DHEA,\\n             DHEAS or any growth promoters i.e. growth hormone itself or analogs of growth hormone\\n\\n         16. Use of anti-androgen medications, i.e. Aldactone, Tagamet, Proscar, estrogens\\n\\n         17. Use of Dilantin or Phenobarbital\\n\\n         18. Alcohol intake > 30 grams (drink more than 2 beers per day OR more than 1 glass of\\n             wine or cocktail daily)\\n\\n         19. Currently smokes any tobacco product\\n\\n         20. Having started a new medication during the past three months which may interfere with\\n             the outcome measures of the study\\n\\n         21. Polycythemia\\n\\n         22. PSA > 4.0 ng/dl\\n\\n         23. Hematocrit < 36\\n\\n         24. Liver function tests greater than 2 times upper normal limits or abnormal\\n             electrolytes, calcium or PTH, at the discretion of the investigator\\n\\n         25. Mini Mental Status Exam score less than or equal to 24"}, "maximum_age": "N/A", "minimum_age": "65 Years", "healthy_volunteers": "Accepts Healthy Volunteers"}	75	2004-03-01	Interventional	Allocation: Randomized, Endpoint Classification: Efficacy Study, Intervention Model: Parallel Assignment, Masking: Double-Blind, Primary Purpose: Treatment	Phase 2	[{"measure": "Improvements in bone quality, muscle strength, cardiac function, cognition, sexual and overall well-being", "time_frame": "1 year", "safety_issue": "No"}, {"measure": "Urinary symptoms", "time_frame": "1 year", "safety_issue": "Yes"}, {"measure": "Glucose tolerance", "time_frame": "1 year", "safety_issue": "No"}, {"measure": "Blood lab values", "time_frame": "1 year", "safety_issue": "Yes"}]	[{"measure": "Effect of testosterone gel vs. anastrozole on sexual function, plasma viscosity, carotid intima & amp; exercise tolerance"}, {"measure": "Effect of testosterone gel vs. anastrozole on effect on pulsatile GH release, cognition. muscle mass. strength and quality of life"}]
c7ac461d58ac46eb9a30d7025ba98712	nct	NCT02331966	{"others": null}	2015-01-05	Molecular Pathways Involved in the Pathogenesis and Behavior of Mesenchymal Phosphaturic Tumors Causing Oncogenic Osteomalacia	The tumors that cause oncogenic osteomalacia (TIO) express and release in the circulation\n      phosphaturic factors such as fibroblast growth factor-23 (FGF-23) that decrease renal\n      phosphate absorption through acting in the proximal renal tubule and decreasing Type 2a and\n      2c sodium-phosphate co-transporter. They typically follow a benign clinical course and even\n      in the rare malignant cases, local recurrence occurs in less than 5% and distant metastasis\n      are very uncommon.\n\n      In this study we aim to investigate the role of other molecular pathways such as ERK1, ERK2,\n      mTOR, EGFR, MEK1, MEK2, VEGFR3, AKT1, AKT2, IGFR-1, IGFR-2, PDGFRA, PDGFRB, cMET, FGFR2,\n      apart from FGF23, KLOTHO and PHEX, in the behavior of histopathologically benign mesenchymal\n      phosphaturic tumors.	Molecular Pathways Involved in the Pathogenesis and Behavior of Mesenchymal Phosphaturic Tumors	Study Protocol Cell Culture Bone marrow and tissue samples will be obtained from the\n      patients after they will give their written informed consent. Material will be maintained in\n      RPMI culture medium (Sigma, R0883, Germany). Peripheral blood mononuclear cells (PBMCs) from\n      healthy donors will be used as control. For detection of cancer cells in our samples we\n      perform flow cytometry using EpCAM magnetic beads (39-EPC-50; Gentaur), and the negative\n      selection cells (non-cancerous) are isolated and then cultured in a 25-cm2 flask (5520100;\n      Orange Scientific) with RPMI-1640 medium (R6504; Sigma).\n\n      Molecular analysis RNA is extracted from cell cultures using RNeasy Mini Kit (74105; Qiagen,\n      Hilden; Germany). iScript cDNA synthesis kit (1708891; Bio-Rad, CA; USA), is used for cDNA\n      synthesis and Real-time polymerase chain reaction (PCR), is performed using the iTaq\n      Universal SYBR Green Supermix (1725124; Bio-Rad). Specific primers for each marker and for\n      an endogenous control gene (18S rRNA) is designed using Genamic Expression 1.1 software. A\n      universal Reference RNA consisting of 10 human cancer cell lines (740000-41; Agilent) as\n      well as human genomic DNA (G304A; Promega) will be used in quantitative PCR (qPCR) reactions\n      Statistical analysis The qPCR results will be tested according to the Kolmogorov-Smirnov\n      test; All the reactions (molecular assays, flow cytometry) are performed in triplicates. A p\n      value <0.05 is considered significant.	Recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n        Patients with tumor induced osteomalacia\\n\\n        Exclusion Criteria:"}, "study_pop": {"textblock": "Patients with tumor induced osteomalacia"}, "maximum_age": "80 Years", "minimum_age": "18 Years", "sampling_method": "Probability Sample", "healthy_volunteers": "No"}	10	2014-09-01	Observational	Observational Model: Case-Only, Time Perspective: Prospective	N/A	[{"measure": "Differential expression of Molecular pathways in tumors inducing oncogenic osteomalacia", "time_frame": "2 years", "safety_issue": "No"}]	[]
db81c2a190cc48028e3bace7ded87ded	nct	NCT02331823	{"others": null}	2014-12-31	Research on New Regimens for Retreatment Pulmonary Tuberculosis	Multi-center, prospective study is performed to investigate the efficacy of new short-course\n      regimen for retreatment pulmonary tuberculosis patients.\n\n      To obtain optimized short-course regimen, decrease treatment cost and improve success rate.	New Super-short Course Regimen for Retreatment Pulmonary Tuberculosis	China is the country with the second highest Tuberculosis (TB) burden in the world. Most of\n      the retreatment TB patients may develop multi-drug resistant. The resistant rate of any of\n      the anti-TB drug is 35.9%, and the multi-drug resistant rate is 15.4%. Retreatment TB\n      becomes one of the factors which inhibit the decrease of morbidity and mortality of TB. It\n      is also a tuff work in TB control. At present the standardized regimen for retreatment TB is\n      2SHREZ/6HRE or 3HREZ/6HRE. The drugs in the regimen are all first-line anti-TB drugs which\n      are unsuitable for the high drug resistance prevalence, because the cure rate of this\n      regimen is low and the adverse reaction is severe.\n\n      Our study is a national multi-center, prospective trail to investigate the efficacy of a new\n      super-short regimen for retreatment TB patients. The new regimen consists of 5 drugs lasting\n      5 months. The cure rate and success rate of the new regimen is compared with standardized\n      regimen usually 8-9 months in order to obtain the optimized regimen.	Recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Sputum confirmed diagnosis of retreatment pulmonary tuberculosis\\n\\n          -  Must be able to swallow tablets\\n\\n          -  Must be able to sign written informed consent form\\n\\n        Exclusion Criteria:\\n\\n          -  Extra-pulmonary tuberculosis\\n\\n          -  Diabetes\\n\\n          -  Allergy to any of the medications in the regimen or pregnancy\\n\\n          -  Liver disease\\n\\n          -  Renal disease\\n\\n          -  Metabolic disease\\n\\n          -  Immune system disease\\n\\n          -  Hematological disease\\n\\n          -  Nervous system and mental disease\\n\\n          -  Endocrine disease\\n\\n          -  Malignant disease\\n\\n          -  Receiving immunosuppressive therapy\\n\\n          -  HIV/AIDS\\n\\n          -  Alcohol addiction"}, "maximum_age": "65 Years", "minimum_age": "18 Years", "healthy_volunteers": "No"}	864	2013-06-01	Interventional	Allocation: Randomized, Endpoint Classification: Efficacy Study, Intervention Model: Parallel Assignment, Masking: Open Label, Primary Purpose: Treatment	Phase 4	[{"measure": "success rate", "time_frame": "for arm A,the point is 5 month after treatment. For arm B,the time point is at the end of the 8 or 9 month's treatment.", "safety_issue": "No"}]	[{"measure": "adverse reaction rate", "time_frame": "for arm A,the point is 5 month after treatment. For arm B,the time point is at the end of the 8 or 9 month's treatment.", "safety_issue": "Yes"}]
7ed0e81400fc4326acdc75d79e83427a	nct	NCT02332044	{"others": null}	2015-01-04	Drug Interaction Study Between Erdosteine and Bepotastine Besilate in Healthy Adult Volunteers	The purpose of this study is to evaluate the drug-drug interaction between Erdosteine and\n      Bepotastine besilate in healthy adult volunteers.	A Randomized, Open-label, Single Dose, Three-treatment, Three-period, Six-sequence Crossover Study to Investigate the Pharmacokinetic Drug Interaction Between Erdosteine and Bepotastine Besilate After Oral Administration in Healthy Volunteers	\N	Completed	{"gender": "Male", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Healthy male subjects aged 20 - 45 years\\n\\n          -  A body mass index in the range 18.5 - 25 kg/m2\\n\\n          -  Willingness to participate during the entire study period\\n\\n          -  Written informed consent after being fully informed about the study procedures\\n\\n        Exclusion Criteria:\\n\\n          -  Any past medical history of hepatic, renal, gastrointestinal, respiratory, endocrine,\\n             psychiatric, neurologic, haemato-oncologic or cardiovascular disease\\n\\n          -  History of clinically significant drug hypersensitivity\\n\\n          -  Use of medication within 7 days before the first dose\\n\\n          -  Heavy drinker/smoker\\n\\n          -  Whole blood donation during 60 days before the study\\n\\n          -  Judged not eligible for study participation by investigator"}, "maximum_age": "45 Years", "minimum_age": "20 Years", "healthy_volunteers": "Accepts Healthy Volunteers"}	\N	2014-04-01	Interventional	Allocation: Randomized, Intervention Model: Crossover Assignment, Masking: Open Label	Phase 1	[{"measure": "Cmax", "time_frame": "Multiple blood sample will be collected for 24 hours after last dosing in each of the treatment", "safety_issue": "No"}, {"measure": "AUClast", "time_frame": "Multiple blood sample will be collected for 24 hours after last dosing in each of the treatment", "safety_issue": "No"}]	[]
cb55ffe1d7e94719b6a90b460284e94b	nct	NCT02330874	{"others": null}	2014-12-28	Validation of the SD-ICU. A Risk Assessment Tool of Unplanned ICU Readmission	In a recent study, which included 845 patients that at the time of ICU discharge had at\n      least one risk factor for readmission, the investigators' group developed a new readmission\n      risk score in the ICU, Safe Discharge from ICU (SD-ICU), using parameters easily and\n      routinely measured in ICU: the Charlson comorbidity (ICC), the TISS-28 (Therapeutic\n      Intervention Scoring System - 28), the length of stay in ICU and age. Through ROC curve\n      analysis, the investigators found that patients with a score above 14.5 had a high\n      probability of readmission.\n\n      The objective of this study is to validate the Safe Discharge from ICU (SD-ICU) score as a\n      tool to predict unplanned readmissions to the intensive care unit.\n\n      All adult patients discharged from a 37 bed general ICU from April 2014 to March 2015 will\n      be included in the study. The SD-ICU score is routinely calculated at the time of discharge\n      from the ICU. Patients will be divided into two groups: those with SD-ICU score> 14.5 (group\n      1) and those with a score equal to or less than 14.5 (group 2). The two groups will be\n      compared with respect to the frequency of unplanned readmissions. Stepwise, multivariate\n      logistic regression will be used to investigate the association between the risk factors for\n      readmission used in SD-ICU score and ICU readmission as outcome.	Assessment of the Risk of Unplanned Readmission to the Intensive Care Unit Using the Safe Discharge From ICU (SD-ICU) Score: A Validation Study.	\N	Active, not recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Adult patients discharged from a general ICU\\n\\n        Exclusion Criteria:\\n\\n          -  Patients under 18 years old\\n\\n          -  Those that were not candidates for ICU readmission (interhospital and home care\\n             transfer)"}, "study_pop": {"textblock": "All adult patients discharged alive from a general ICU"}, "maximum_age": "N/A", "minimum_age": "18 Years", "sampling_method": "Probability Sample", "healthy_volunteers": "No"}	1000	2014-04-01	Observational	Observational Model: Cohort, Time Perspective: Retrospective	N/A	[{"measure": "Readmission to the ICU", "time_frame": "After ICU discharge", "safety_issue": "No"}]	[]
ab4c1894ac1c471e97ff3d90678ebab1	nct	NCT02331017	{"others": null}	2014-12-24	Assessment of Bimodal Contribution in Adult Cochlear Implant Users	To evaluate the combination of electric hearing through Cochlear Implant and acoustic\n      hearing through hearing aid in bimodal users with moderate-to-severe hearing loss in the\n      non-implanted ear. The research will also provide pilot study data on unilateral Cochlear\n      Implant recipients with residual useful acoustic hearing in the implanted ear whose acoustic\n      hearing has been preserved.	Assessment of the Contribution of the Combined Acoustic Hearing Via a Hearing Aid and Electric Hearing Via a Cochlear Implant in Adult Bimodal Users With Moderate to Severe Residual Hearing in the Implanted and Non Implanted Ear.	Many current unilateral Cochlear Implant users have some residual acoustic hearing in the\n      opposite ear as well as in the implanted ear. The amount of useful residual acoustic hearing\n      varies among these implantees. There are several acoustic and electric combinations in the\n      bilateral-bimodal listening mode depending on the amount of useful residual acoustic hearing\n      in each ear. The combination of low frequency acoustic information provided by the hearing\n      aid on each ear, completes the high frequency electric information provided by the Cochlear\n      Implant (complementary bimodal benefit). Each of the different rehabilitation\n      combinationsfor unilateral Cochlear Implant users enablesa unique integration of the three\n      aspects of bilateral hearing bilaterality, binaurality and bimodality which may provide\n      significant advantages over unilateral Cochlear Implant stimulation in terms of speech\n      perception in noise, complementary information as well as localization abilities.\n\n      The study will include 20 bilateral-bimodal users with moderate-to-severe hearing loss at\n      250 Hz, 500 Hz and 1000 Hz in the non-implanted ear, who use hearing aids for at least 75%\n      of their waking hours. Evaluation utilizes bilateral-binaural and bimodal complementary\n      effects task-specific test batteries based on published doctoral research project. The\n      assessment protocol consisted of tests that include various speech materials, different\n      maskers, presentation of the noise from different locations in space, right/left speech\n      lateralization, pitch-related tasks and subjective questionnaires. All tests will be\n      administered in three listening conditions: Cochlear Implant -alone, hearing aid-alone and\n      Cochlear Implant +hearing aid.	Recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  Bilateral-bimodal users\\n\\n          -  With moderate-to-severe hearing loss at 250 Hz, 500 Hz and 1000 Hz in the\\n             non-implanted ear\\n\\n          -  Who use hearing aids for at least 75% of their waking hours\\n\\n        Exclusion Criteria:"}, "maximum_age": "N/A", "minimum_age": "18 Years", "healthy_volunteers": "No"}	20	2014-12-01	Interventional	Intervention Model: Single Group Assignment, Masking: Open Label, Primary Purpose: Treatment	N/A	[{"measure": "Speech perception task specific tests using assessment protocol which will include 6 speech perception tests in quiet and noise listening conditions.", "time_frame": "12 months", "description": "ests designed to examine the contribution of bilateral-binaural benefits:\\nSemantically unpredictable sentence recognition presented from the front in the presence of a two-male-talker masker.\\nHorizontal right/left speech lateralization in quiet\\nPerception of monosyllabic words (HAB) in competing three-male-talker babble.\\nSemantically unpredictable sentence recognition in the presence of one competing talker using a reversed speech sentence spoken by only two different talkers with different F0 characteristics.\\nPerception of intonation.\\nEvaluation of the difference between the perception of natural prosody speech and the perception of speech with flattened F0 contour", "safety_issue": "No"}]	[{"measure": "Assessment of functional performance in daily life using self-repot questionnaires", "time_frame": "12 months", "description": "the Speech, Spatial and Quality (SSQ) questionnaire and the Hearing Handicap Questionnaire (HHQ).", "safety_issue": "No"}, {"measure": "Standard basic speech perception tests", "time_frame": "12 Months", "description": "Standard basic speech perception tests which will enable to characterize the basic speech perception abilities of the bilateral-bimodal users by means of a commonly utilized assessment tool: monosyllabic word discrimination on the Hebrew version of the AB Word List (HAB) in quiet; Hebrew version of the CID sentence recognition test in quiet and the Hebrew version of the CID sentence recognition test in the presence of four-talker-babble noise with the SNR fixed at +5dB, speech and noise presented from the front.", "safety_issue": "No"}]
536dc8fb46074292b3c0df85b3f0ac59	nct	NCT02330861	{"others": null}	2014-12-24	Relationship Between Pressure and Flow Velocity on Coronary Physiology	Subjects are patients who are planned to do percutaneous coronary intervention for coronary\n      stenosis in the left circumflex artery without other stenosis in the left ascending artery\n      and the right coronary artery, or a patient with normal coronary artery. Immediately after\n      coronary angiography or percutaneous coronary intervention, the investigators will evaluate\n      for coronary hemodynamics by distribution of wave intensity which is calcurated by coronary\n      pressure and flow velocity with Combowire in each coronary segment. Also, they will assess\n      coronary morphology by View It in each coronary segment.	Relationship Between Pressure and Flow Velocity on Coronary Physiology	Combowire (Volcano Therapeutics Inc., CA, USA) is a 0.014 inch pressure/Doppler\n      sensor-tipped-guidewire which can measure coronary pressure and flow velocity.\n\n      View It (Terumo Co., Japan) is a guide catheter with intravascular ultrasound which can\n      measure coronary morphology such as vessel diamter.	Recruiting	{"gender": "Both", "criteria": {"textblock": "Inclusion Criteria:\\n\\n          -  A patient who are planned to do percutaneous coronary intervention for stenosis in\\n             the left circumflex artery without any lesions in other coronary arteries\\n\\n          -  Or a patient who is performed coronary angiography without significant stenosis\\n             lesion in 3-coronary vessel\\n\\n        Exclusion Criteria:\\n\\n          -  A patient with coronary stenosis with LAD\\n\\n          -  Hemodialysis\\n\\n          -  Acute coronary syndrome\\n\\n          -  Congestive heart failure\\n\\n          -  A patient with shock vitals"}, "maximum_age": "N/A", "minimum_age": "18 Years", "healthy_volunteers": "No"}	15	2014-12-01	Interventional	Intervention Model: Single Group Assignment, Masking: Open Label	N/A	[{"measure": "Wave intensity", "time_frame": "Immediately after coronary angiography or percutaneous coronary intervention", "safety_issue": "No"}]	[{"measure": "Coronary pressure", "time_frame": "Immediately after coronary angiography or percutaneous coronary intervention", "safety_issue": "No"}, {"measure": "Flow velocity", "time_frame": "Immediately after coronary angiography or percutaneous coronary intervention", "safety_issue": "No"}, {"measure": "Vessel diameter", "time_frame": "Immediately after coronary angiography or percutaneous coronary intervention", "safety_issue": "No"}]
\.


--
-- TOC entry 3077 (class 0 OID 24336)
-- Dependencies: 188
-- Data for Name: trial_document; Type: TABLE DATA; Schema: public; Owner: opentrials
--

COPY trial_document (trial_uuid, document_uuid, role, context) FROM stdin;
\.


--
-- TOC entry 3075 (class 0 OID 24300)
-- Dependencies: 186
-- Data for Name: trial_intervention; Type: TABLE DATA; Schema: public; Owner: opentrials
--

COPY trial_intervention (trial_uuid, intervention_uuid, role, context) FROM stdin;
53ff08be34ff44e19554c980e6c2dddb	240531882a414e3686a87dc5944f80e5	\N	{"description": "Total body exposure to increased atmospheric pressure oxygen", "arm_group_label": "Hyperbaric oxygen therapy-TBI", "intervention_name": "Hyperbaric oxygen therapy", "intervention_type": "Drug"}
44b69aa9f0b3405b9b3c538068f3f074	c138bb82cf5449018f8ebf4f6e21e785	\N	{"description": "total body exposure to greater than atmospheric pressure oxygen", "arm_group_label": "1", "intervention_name": "HBOT", "intervention_type": "Drug"}
d1de51d8fe8e459090da7be435e870a4	7bd64404aadc49468c8bd3d5f2dae1ee	\N	{"other_name": "HBOT", "description": "HBOT: 1.5 ATA/60 minutes twice/day, 5 days/week for 40 or 80 treatments", "arm_group_label": ["Hyperbaric oxygen therapy-TBI/PCS", "Hyperbaric Oxygen Therapy-PCS/PTSD"], "intervention_name": "Low pressure hyperbaric oxygen therapy", "intervention_type": "Drug"}
15d338c686c94190a5762b91cc54a223	d2e4af6ecfc349a2a170ddc3516e4a57	\N	{"other_name": "Lonactene", "description": "Protocol A (carbetocin + placebo) Carbetocin: 100ug (1mL) + Ringer's Lactate 10mL directly into the vein in no less than two minutes.", "arm_group_label": "Carbetocin", "intervention_name": "Carbetocin", "intervention_type": "Drug"}
15d338c686c94190a5762b91cc54a223	7d67f9bedb014de486007f3f604b8983	\N	{"other_name": "Pitocin", "description": "Oxytocin 20 U (4mL) diluted in a bag with 1000mL of Ringer's Lactate to be passed intravenously at a rate of 125mL/hr", "arm_group_label": "Oxytocin", "intervention_name": "Oxytocin", "intervention_type": "Drug"}
11184694aa97459280d37318a5c71cb7	7257591b422b41f6ae085b16311e7fc8	\N	{"other_name": "High dose oxygen", "description": "Use of oxygen 80% FIO2 during surgery and 2 hours after the procedure. For this purpose an oxygen mask with reservoir will be used (to guarantee the supply of 80% oxygen during and after surgery)", "arm_group_label": "Oxygen 80% FIO2", "intervention_name": "Supplemental oxygen 80% FIO2", "intervention_type": "Device"}
11184694aa97459280d37318a5c71cb7	b11add84ff3f44d3982f375b9f586a0e	\N	{"other_name": "No oxygen", "description": "No use of oxygen during surgery or in the 2 hours after the procedure.", "arm_group_label": "Use of air (no oxygen during surgery)", "intervention_name": "Use of air (no oxygen during surgery)", "intervention_type": "Procedure"}
61722e86e4914bbeb905f135146a904f	66a1642f11cb4b0d8e76f2b84e90425c	\N	{"description": "Injection of steroids and local anesthetic into the epidural space", "arm_group_label": "Epidural steroids", "intervention_name": "epidural steroid injection", "intervention_type": "Procedure"}
61722e86e4914bbeb905f135146a904f	6f9482b09ebf4c9a86f9f740e1b0963f	\N	{"description": "Injection of saline into the back muscles", "arm_group_label": "Gabapentin", "intervention_name": "Sham epidural steroid injection", "intervention_type": "Procedure"}
61722e86e4914bbeb905f135146a904f	a14fc8615b114abb9add37506a2a189f	\N	{"description": "Titration of gabapentin to effect", "arm_group_label": "Gabapentin", "intervention_name": "Gabapentin", "intervention_type": "Drug"}
61722e86e4914bbeb905f135146a904f	ac2c33ef8f1f4567b1599384e7415c91	\N	{"description": "Titration of placebo gabapentin", "arm_group_label": "Epidural steroids", "intervention_name": "Placebo gabapentin", "intervention_type": "Drug"}
ceaedb02971c478aa16f9b745b15b102	0d7fdc7c36aa43a89ad16b4af8c5665e	\N	{"description": "Collection of a random sample of urine for a spot test and a 24 hour urine collection for a 24 hour urine protein.", "arm_group_label": "Hypertensive disorder of pregnancy", "intervention_name": "Hypertensive disorder of pregnancy", "intervention_type": "Other"}
b00153a39c094953bba31fbf66441621	a022a1dcef4f4e62a6a88df8ebbb8e8b	\N	{"other_name": "N\\\\A", "description": "Auditory guided imagery disk - will be prepared by Ronit Brooks, a clinical psychologist, who is engaged in guided imagery and by Livia Yanai, an art therapist.", "arm_group_label": "guided imaginary", "intervention_name": "guided imaginary", "intervention_type": "Behavioral"}
b00153a39c094953bba31fbf66441621	3d83643dbc1e48baa21c137461563e99	\N	{"other_name": "N\\\\A", "description": "music. It will be equal in length to the auditory guided imagery disk", "arm_group_label": "music", "intervention_name": "music ONLY", "intervention_type": "Behavioral"}
442a08b9147a4a4db549a48acb7708f4	de0a10d04fe446feb896ef870cae4a18	\N	{"description": "passive tube drains (PFM Medical, Köln, Germany)", "arm_group_label": "Closed gravity drain", "intervention_name": "Closed gravity drain", "intervention_type": "Procedure"}
442a08b9147a4a4db549a48acb7708f4	85263bf749e148a39026dc1af3bc4082	\N	{"description": "BLAKE Silicon drains (Ethicon, USA)", "arm_group_label": "Closed suction drain", "intervention_name": "closed suction drain", "intervention_type": "Procedure"}
1a54f4e1103445b882ca69869c6eda02	240531882a414e3686a87dc5944f80e5	\N	{"description": "Total body pressurized oxygen", "arm_group_label": "Hyperbaric oxygen therapy", "intervention_name": "Hyperbaric oxygen therapy", "intervention_type": "Drug"}
52e1e17626e349b0a3feb1c9776b2d6c	33a701c020b640c59a04936790a5a75b	\N	{"other_name": "Premixed 30:70 insulin two times a day", "description": "Premixed insulin twice daily before breakfast and before dinner", "arm_group_label": "Premixed insulin", "intervention_name": "Mixtard 30:70 Novonordisk® twice daily", "intervention_type": "Drug"}
52e1e17626e349b0a3feb1c9776b2d6c	4294960629d34f11b0e216be44ec0bee	\N	{"other_name": "Basal bolus regimen", "description": "Injection of Lantus® insulin once daily and rapid insulin Apidra® before breakfast, lunch and dinner", "arm_group_label": "Basal-bolus", "intervention_name": "Lantus® once daily and Apidra® before meals", "intervention_type": "Drug"}
74d612a1e139412c8d678a45dd735bae	6e3c577df9e94d8ea498e91a768b8bb9	\N	{"description": "peer support is delivered by persons with a severe mental illness after the experience of recovery and after absolving a one year education to support others on their way to recovery", "arm_group_label": "peer support", "intervention_name": "peer support", "intervention_type": "Behavioral"}
e2abfff79c3547c7b6ae35733efa306a	83ff72cc71314a3dbda940ed256bab03	\N	{"other_name": "Coumadin", "description": "Patients with prosthetic valve abnormalities suggestive of thrombus will be administered anticoagulation therapy with Vitamin K antagonists (Warfarin) for 3 months with goal INR 2-3, followed by repeat contrast CT of the chest and transthoracic imaging. Repeat imaging following 3 months of anticoagulation therapy is performed to evaluate the response to anticoagulation therapy.", "arm_group_label": "Pre-existing bioprosthetic aortic valve", "intervention_name": "Warfarin", "intervention_type": "Drug"}
25d6cb4e3db1409aaeb6b8779e873f27	208295130822444691628b33e9a996d6	\N	{"description": "A sample of amniotic fluid was taken before the birth of fetus between 26 and 36 6/7 weeks of pregnancy.", "arm_group_label": "Preterm fetus", "intervention_name": "Preterm fetus", "intervention_type": "Procedure"}
cee9487fc21545d38a9bce118c3ab8f4	0508d7e224084067b88f904b6c35c2eb	\N	{"arm_group_label": "Device", "intervention_name": "Capsular Tension Ring", "intervention_type": "Device"}
01feee5811754170917068f8f40027d0	4f31b0c3a47b4dbb9b70bc3fbfe7d2f1	\N	{"description": "Cybernetic microradiosurgery (6MV) using tracking to TD 25Gy given in five fraction (5Gy p fr) two or three days a week, during 2 weeks", "arm_group_label": "Cybernetic microradiosurgery", "intervention_name": "Cybernetic microradiosurgery", "intervention_type": "Radiation"}
01feee5811754170917068f8f40027d0	7cb42f9f6f6845d38febd02574bd8b5d	\N	{"description": "Conventionally fractionated linac based external beam radiation therapy - EBRT, (conformal or dynamic) to the TD of 36 Gy, in 2.0 Gy per fraction 5 days a week over the period of 3.5 weeks)", "arm_group_label": "Conventional radiotherapy", "intervention_name": "Conventional radiotherapy", "intervention_type": "Radiation"}
b0fb783f005841acbc4f462688e2473a	c35a329a43bb4b3ea3aee78d3c3796d2	\N	{"description": "In Qingxuan Decoction, there are a bag of Chinese honeylocust spine，Glehnia littoralis and Smilax china L,and two bags of Silktree albizia bark, Kadsura interior,Cortex dictamni, Lilium brownii var, Silkworm larva,Forsythia suspensa and Rhizoma polygonati preparata, and three bags of viridulumArisaema erubescens and Poria cocos Wolf. All drugs are made by Jiangyin Tianjiang company in China.", "arm_group_label": "Intervene", "intervention_name": "Qingxuan Decoction", "intervention_type": "Drug"}
e6809e6d890345bf845db683fc93de82	97f23faa1b1449a2897f7f026bc9d5f4	\N	{"other_name": "Renvela", "description": "Pharmaceutical form:tablet\\nRoute of administration: oral", "arm_group_label": ["CKD patients not on dialysis 800 mg", "CKD patients on dialysis 800 mg"], "intervention_name": "sevelamer carbonate 800mg", "intervention_type": "Drug"}
e6809e6d890345bf845db683fc93de82	83895d96d73b4d8d993e2bf2f118ea5f	\N	{"other_name": "Renvela", "description": "Pharmaceutical form:powder\\nRoute of administration: oral", "arm_group_label": ["CKD patients not on dialysis 2.4 g", "CKD patients on dialysis 2.4 g"], "intervention_name": "sevelamer carbonate 2.4 g", "intervention_type": "Drug"}
ce125881b9ce40d9afbb7ee749283a06	60c6b2f452c645ddbbdf06b1672568c7	\N	{"other_name": "Hepatic resection", "description": "Removal of a part of the liver", "arm_group_label": ["Major hepatectomy (MH)", "Multiple minor hepatectomy (MMH)"], "intervention_name": "Hepatectomy", "intervention_type": "Procedure"}
a3f2a4c44c0c4104a0b228a675f241fd	c17860ac994f4020b98dfd28f78fe493	\N	{"other_name": "VVZ-149 injection or water for injection", "description": "Colorless, transparent liquid in water for injection", "arm_group_label": ["Single Dose_VVZ-149 injection", "Loading/Maintenance_VVZ-149 injection"], "intervention_name": "VVZ-149 injection", "intervention_type": "Drug"}
a3f2a4c44c0c4104a0b228a675f241fd	37201bc685c648cdafdb201b2d21c521	\N	{"other_name": "VVZ-149 injection or water for injection", "description": "water for injection", "arm_group_label": "Loading/Maintenance_Placebo", "intervention_name": "Placebo", "intervention_type": "Other"}
ef0fbc6785604dc48fe73278f7a47dda	221758b59d96469e9e2e06909c60e134	\N	{"description": "Anodal DC stimulation (2 mA, 20 min) will be delivered by a constant direct current electrical stimulator connected to a pair of electrodes", "arm_group_label": "Experimental Treatment", "intervention_name": "Experimental treatment", "intervention_type": "Other"}
ef0fbc6785604dc48fe73278f7a47dda	9b24223f13ff4d11b2a35332ffb84d90	\N	{"description": "Electrodes will be placed as for active stimulation, but the stimulator will automatically turn off after 10 s", "arm_group_label": "Placebo treatment", "intervention_name": "Placebo treatment", "intervention_type": "Other"}
eb4b257db321499a9f18b975c3c856b5	d3a90d70dda6460287f9ab78a1607e8e	\N	{"description": "The investigators do lifestyle counseling for PCOS patients and monitor the factors to normal level, like BMI, serum index etc.", "arm_group_label": "Lifestyle counseling", "intervention_name": "Lifestyle Counseling", "intervention_type": "Behavioral"}
50f63fb57e0445638b743f1c06fb1547	0963878ab878474cb7214180ceec1cf5	\N	{"description": "High resolution manometry of the esophagus", "arm_group_label": "Eosinophilic esophagitis", "intervention_name": "High resolution manometry (HRM)", "intervention_type": "Device"}
de5b8a97b1a743baa9467ee30d1b2311	791b50933650456083fd76d2262ebfd4	\N	{"description": "Participants will be asked to use their assigned training program for forty minutes per session, up to five sessions per week, over 10 weeks (50 total sessions).", "arm_group_label": "Computerized Plasticity-based Software", "intervention_name": "Computerized Plasticity-based Software", "intervention_type": "Behavioral"}
de5b8a97b1a743baa9467ee30d1b2311	16dc49e0f8dd4986a09e5cc2722884b3	\N	{"description": "Participants will be asked to use their assigned video games for forty minutes per session, up to five sessions per week, over 10 weeks (50 total sessions).", "arm_group_label": "Commercially available video game", "intervention_name": "Commercially available Video Game", "intervention_type": "Behavioral"}
e93439dee88249fb93d9e3a038d3bd9a	f8e61682e4024a86965f335d51bf8050	\N	{"arm_group_label": ["step up", "step down"], "intervention_name": "azathioprine or adalimumab and infliximab", "intervention_type": "Drug"}
7371e77b756145728b4655fd0cdc4722	484945a9cc464d87918d93fad5756568	\N	{"description": "Oral application of vibratory stimulus\\n: With the oral equipment, which is similar to the device generally used to prevent teeth grinding in dental clinics, 15-second vibratory and 15-second non-vibratory stimulus are given repeatedly for about 5 minutes using a vibrator that has a strength less than or equal to the vibratory stimulus of a smartphone (3.3V, 166Hz, maximum 180Hz). A stimulus of two times for 5 minutes, a total of at least 10 minutes is conducted for 10 days in a hospital or designated place.", "arm_group_label": "Intervention", "intervention_name": "Oral Vibrational Stimulation", "intervention_type": "Device"}
f9957d004f1e4250abfa0f94d9ee3927	89d25738fcba4ebaadf445401810637b	\N	{"other_name": "Experimental Group", "description": "The protocol of conventional physiotherapy will be customized and will include exercises to improve strength and muscle power, flexibility, mobility, balance, and aerobic conditioning exercises. In particular cases, when necessary analgesia will be used to relive pain. The progression of the exercises will be individualized according to the treatment plan established in the initial functional assessment and will be target to meet patient's improvement during treatment. Conventional physiotherapy will be conducted in pairs. In this group exercises that are best accomplished using virtual scenarios, such as dual task exercises, anticipatory adjustments exercises and inter limb coordination exercises will be performed using video games.", "arm_group_label": "Experimental Group", "intervention_name": "Exergames and conventional physiotherapy", "intervention_type": "Other"}
f9957d004f1e4250abfa0f94d9ee3927	b8391eec15404ee9a3a48530dae9e702	\N	{"other_name": "Control Group", "description": "The protocol of conventional physiotherapy will be customized and will include exercises to improve strength and muscle power, flexibility, mobility, balance, and aerobic conditioning exercises. In particular cases, when necessary analgesia will be used to relive pain. The progression of the exercises will be individualized according to the treatment plan established in the initial functional assessment and will be target to meet patient's improvement during treatment. Conventional physiotherapy will be conducted in pairs. In this group dual task exercises, anticipatory adjustments exercises and inter limb coordination exercises will be performed without the virtual environment.", "arm_group_label": "Control group", "intervention_name": "Conventional physiotherapy", "intervention_type": "Other"}
89d86c6d50b943f783b2a43f3cba28df	67325bacb7a14b3196ddf434984ef982	\N	{"arm_group_label": "Candidemia", "intervention_name": "Candidemia", "intervention_type": "Other"}
ef64787040504d2f985625b8527c3cca	8beb23bae22843f7bcdca03163d28c70	\N	{"other_name": "Acupuncture", "description": "Electroacupuncture (EA) has been used as a part of Traditional Chinese Medicine (TCM) and the benefits and success of EA as a viable treatment option for acute and chronic pain of various origins have been well-recognised.electro-acupuncture (EA) is taken place as to give out the stimulation with fixed frequency, pulse width and current to acupuncture needle for further promotion of analgesics effects.", "arm_group_label": ["Electroacupuncture", "Sham"], "intervention_name": "Electroacupuncture", "intervention_type": "Procedure"}
9802d765c6744a949123c3f21415213a	9e6ce76a84344e80b6242bb266cfc8e9	\N	{"other_name": "CAR T cells targeting overexpressed EGFR in cancer cells", "arm_group_label": "anti-EGFR CAR T", "intervention_name": "anti-EGFR CAR T", "intervention_type": "Biological"}
1cfc3d6219cf465ca8f1f580fc1e578d	2bbd0cde945d476ab259e2d269f7b94e	\N	{"description": "Use of an ablative treatment (cryotherapy) for the management of Low-Grade Squamous Intraepithelial Lesions of the cervix.", "arm_group_label": "Ablative treatment", "intervention_name": "Ablative treatment", "intervention_type": "Procedure"}
1cfc3d6219cf465ca8f1f580fc1e578d	8c178594034549a8bf4933fccfe6c6b4	\N	{"description": "Patients diagnosed with Low-Grade Squamous Intraepithelial Lesions were managed with observation and evaluation at 6 and 12 months after diagnosis.", "arm_group_label": "Expectant treatment", "intervention_name": "Expectant management", "intervention_type": "Procedure"}
d8deffd078f74c89b457733561542bc1	04944a98b99445b29f61f5b815e57995	\N	{"other_name": "G-CSF", "description": "Granulocyte colony-stimulating factor(G-CSF) was given 5 ug/kg subcutaneously qd for 6 doses,then qod for other 6 doses(total 12 doses).", "arm_group_label": "Granulocyte colony-stimulating factor", "intervention_name": "Granulocyte colony-stimulating factor", "intervention_type": "Drug"}
d8deffd078f74c89b457733561542bc1	ef4eab939b574180a36117b642cc7da6	\N	{"other_name": "SDT", "description": "Standard treatment includes reduced glutathione, glycyrrhizin, ademetionine,polyene phosphatidylcholine, alprostadil, and human serum albumin) on the day of admission. HBV associated ACLF patients receive entecavir at the same time", "arm_group_label": ["Granulocyte colony-stimulating factor", "standard treatment"], "intervention_name": "standard treatment", "intervention_type": "Drug"}
44e8a55bbd884df789c47b8d4146508b	205f8202d20342b2a769509d44ab16cd	\N	{"description": "Endoscopic Technique; endoscopic transcanal lateral graft tympanoplasty using An endoscope (Karl Storz, Tuttlingen, Germany) and A microdrill (Skeeter Otologic Drill System; Medtronic Xom ed Surgical Products, Inc., Jacksonville, FL, USA)", "arm_group_label": "Endoscopic Technique", "intervention_name": "Endoscopic Technique", "intervention_type": "Device"}
44e8a55bbd884df789c47b8d4146508b	91c6f8e441354297955b596c54c82eed	\N	{"description": "Microsopic surgical approach using a Zeiss Opmi 111 (Carl Zeiss, Jena, Germany) operating microscope", "arm_group_label": "Microscopic Technique", "intervention_name": "Microscopic Technique", "intervention_type": "Device"}
db81c2a190cc48028e3bace7ded87ded	e294028dcb4c4089adddec3656977549	\N	{"other_name": ["ethambutol tablets", "pyrazinamide tablets", "rifabutin capsules", "moxifloxacin tablets"], "description": "a regimen consists of 5 anti-TB drugs (Isoniazid Aminosalicylate Tablets+pyrazinamide tablets+ethambutol tablets+rifabutin capsules+moxifloxacin tablets)to treat retreatment pulmonary tuberculosis patients. The total treatment course is 5 months.", "arm_group_label": "arm A: super-short retreatment regimen", "intervention_name": "Isoniazid Aminosalicylate Tablets", "intervention_type": "Drug"}
db81c2a190cc48028e3bace7ded87ded	e4ac677bb9944c0b8ea26ba65b232ccb	\N	{"other_name": ["isoniazid tablets", "ethambutol tablets", "rifampicin capsules", "pyrazinamide tablets"], "description": "standardized regimen 2 months of streptomycin injectable + isoniazid tablets + ethambutol tablets + rifampicin capsules + pyrazinamide tablets and 6 months of isoniazid tablets + ethambutol tablets + rifampicin capsules or 3 months of isoniazid tablets + ethambutol tablets + rifampicin capsules + pyrazinamide tablets and 6 months of isoniazid tablets + ethambutol tablets + rifampicin capsules to treat Arm B patients as a control to arm A.The treatment course is 8-9 months.", "arm_group_label": "arm B:standardized retreatment regimen", "intervention_name": "Streptomycin injectable", "intervention_type": "Drug"}
025d2bb5b38448c88e5bedf9ee8289a3	9eabc141943e4b72af88064e4b3ddd05	\N	{"other_name": "Adrenal corticosteroid", "description": "Add methylprednisolone in addition to the experience antibiotics in children with urinary tract infection to see if the frequency of the renal scar formation could be decreased", "arm_group_label": "UTI treated with Methylprednisolone", "intervention_name": "Methylprednisolone", "intervention_type": "Drug"}
7ed0e81400fc4326acdc75d79e83427a	714ae361a6bf4cffb7506567f8d34383	\N	{"description": "capsule, 300mg", "arm_group_label": "Erdosteine 300mg", "intervention_name": "Erdos", "intervention_type": "Drug"}
7ed0e81400fc4326acdc75d79e83427a	bf0e1d6e65144873a4ec7c9ba7fccdce	\N	{"description": "tablet, 10mg", "arm_group_label": "Bepotastine besilate 10mg", "intervention_name": "Talion", "intervention_type": "Drug"}
7ed0e81400fc4326acdc75d79e83427a	552a1def225b4b2598056527b0a7cea6	\N	{"description": "capsule 300mg and tablet 10mg", "arm_group_label": "Erdosteine 300mg + Bepotastine besilate 10mg", "intervention_name": "Erdos, Talion", "intervention_type": "Drug"}
5ef35ba17e1c48899536232b7d71702e	d7d532dd2543431198ada81fee492a66	\N	{"description": "1 mg tablet for 12 months", "arm_group_label": "1", "intervention_name": "Androgel (Testosterone Gel)", "intervention_type": "Drug"}
5ef35ba17e1c48899536232b7d71702e	b0819b11d73d472987bc111046d53244	\N	{"arm_group_label": "2", "intervention_name": "Anastrozole (Aromatase Inhibitor)", "intervention_type": "Drug"}
5ef35ba17e1c48899536232b7d71702e	fc63ae2cf15f4be0ade88b47daa1bc71	\N	{"description": "Daily for 12 months", "arm_group_label": ["1", "3"], "intervention_name": "Placebo tablet", "intervention_type": "Drug"}
5ef35ba17e1c48899536232b7d71702e	07f7ebb955cd4db492a469ff8f53dfb1	\N	{"description": "Daily for 12 months", "arm_group_label": ["2", "3"], "intervention_name": "Placebo gel", "intervention_type": "Drug"}
5ef35ba17e1c48899536232b7d71702e	e68cf4aaa59043f1bd52c355f6fa3dcb	\N	{"description": "1 tablet three times a day", "arm_group_label": ["1", "2", "3"], "intervention_name": "Calcium Cardone 500mg with vitamin D 400 IU", "intervention_type": "Dietary Supplement"}
b264cf2293df4b24adf4d53ab94ff6c2	0e2f1fb2a3244673a066afb7a22d233b	\N	{"arm_group_label": "Low fat- Low glycemic index", "intervention_name": "Low fat- Low glycemic index meal", "intervention_type": "Other"}
b264cf2293df4b24adf4d53ab94ff6c2	a8fefab04a16482399b27b5c2d56dd56	\N	{"arm_group_label": "MUFA- Low glycemic index", "intervention_name": "MUFA- Low glycemic index meal", "intervention_type": "Other"}
b264cf2293df4b24adf4d53ab94ff6c2	385e462c2d9444a68f1a05dd9df3e3b8	\N	{"arm_group_label": "SAFA- Low glycemic index", "intervention_name": "SAFA- Low glycemic index meal", "intervention_type": "Other"}
b264cf2293df4b24adf4d53ab94ff6c2	90e60cfb425d45778c19a95ca141c197	\N	{"arm_group_label": "Low fat- High glycemic index", "intervention_name": "Low fat- High glycemic index meal", "intervention_type": "Other"}
b264cf2293df4b24adf4d53ab94ff6c2	698980c894f847f5bf0294e2919842e4	\N	{"arm_group_label": "MUFA- High glycemic index", "intervention_name": "MUFA- High glycemic index meal", "intervention_type": "Other"}
b264cf2293df4b24adf4d53ab94ff6c2	4361a7b991d74701a352e209b4c1f8f9	\N	{"arm_group_label": "SAFA- High glycemic index", "intervention_name": "SAFA- High glycemic index meal", "intervention_type": "Other"}
ab4c1894ac1c471e97ff3d90678ebab1	3195d10f52ff41d4a1f9c8d764038c92	\N	{"description": "Speech perception test results and self-rating questionnaire scores will be analyzed by means of non-parametric statistical tests. The statistical tests will be chosen in accordance with the number and type of variables in each test. Correlation between audiological variables (aided and unaided hearing thresholds in the non implanted ear, aided speech perception abilities in the HA-alone condition) and the bilateral-bimodal benefit will be examined. Moreover, possible relationship between self-rating questionnaire scores and speech perception test results will be assessed.", "arm_group_label": "Bimodal users", "intervention_name": "Speech perception tests and self-rating questionnaire", "intervention_type": "Behavioral"}
536dc8fb46074292b3c0df85b3f0ac59	69896b982937415182b8c6961ca1ae75	\N	{"arm_group_label": "Normal coronary artery", "intervention_name": "combowire and IVUS", "intervention_type": "Device"}
\.


--
-- TOC entry 3073 (class 0 OID 24264)
-- Dependencies: 184
-- Data for Name: trial_location; Type: TABLE DATA; Schema: public; Owner: opentrials
--

COPY trial_location (trial_uuid, location_uuid, role, context) FROM stdin;
53ff08be34ff44e19554c980e6c2dddb	07f0bc1855354eb0ab31629964ea6d3a	recruitment_countries	{}
44b69aa9f0b3405b9b3c538068f3f074	07f0bc1855354eb0ab31629964ea6d3a	recruitment_countries	{}
d1de51d8fe8e459090da7be435e870a4	07f0bc1855354eb0ab31629964ea6d3a	recruitment_countries	{}
ec0af25421a14d76bccef2597e738cb2	06b39f78a0f64cd99c6230ac38be4dc9	recruitment_countries	{}
15d338c686c94190a5762b91cc54a223	06b39f78a0f64cd99c6230ac38be4dc9	recruitment_countries	{}
11184694aa97459280d37318a5c71cb7	06b39f78a0f64cd99c6230ac38be4dc9	recruitment_countries	{}
61722e86e4914bbeb905f135146a904f	07f0bc1855354eb0ab31629964ea6d3a	recruitment_countries	{}
ceaedb02971c478aa16f9b745b15b102	06b39f78a0f64cd99c6230ac38be4dc9	recruitment_countries	{}
ebd88f3f3e4b46328a6b786307c41521	06b39f78a0f64cd99c6230ac38be4dc9	recruitment_countries	{}
b00153a39c094953bba31fbf66441621	2d86baea02f2401aa971b8538a7f5afc	recruitment_countries	{}
c881db91c82a4e1eb6466d0dbf4ca8ed	06b39f78a0f64cd99c6230ac38be4dc9	recruitment_countries	{}
442a08b9147a4a4db549a48acb7708f4	3500028ee6444b3d839682abbd701737	recruitment_countries	{}
ac5ccbaf949f4353bfd7b8d7cbbb70fc	06b39f78a0f64cd99c6230ac38be4dc9	recruitment_countries	{}
1a54f4e1103445b882ca69869c6eda02	07f0bc1855354eb0ab31629964ea6d3a	recruitment_countries	{}
e2abfff79c3547c7b6ae35733efa306a	07f0bc1855354eb0ab31629964ea6d3a	recruitment_countries	{}
25d6cb4e3db1409aaeb6b8779e873f27	06b39f78a0f64cd99c6230ac38be4dc9	recruitment_countries	{}
e93439dee88249fb93d9e3a038d3bd9a	2337302ab55f4c6281dfebc9dcdfa0ec	recruitment_countries	{}
cee9487fc21545d38a9bce118c3ab8f4	07f0bc1855354eb0ab31629964ea6d3a	recruitment_countries	{}
01feee5811754170917068f8f40027d0	94d8c76c722c4e35960d4d8505077bab	recruitment_countries	{}
f9957d004f1e4250abfa0f94d9ee3927	6fe3e8b5a2a445a3b641dd10ba8791c1	recruitment_countries	{}
cd359a56c95442d4a5f78034be23e9de	6fe3e8b5a2a445a3b641dd10ba8791c1	recruitment_countries	{}
3d331c8ffb334c369ff0b954d64416d5	439226a0038649ac8b699510a24c0bff	recruitment_countries	{}
9802d765c6744a949123c3f21415213a	b204af8b84084ada993875e3c41eeeb3	recruitment_countries	{}
1cfc3d6219cf465ca8f1f580fc1e578d	06b39f78a0f64cd99c6230ac38be4dc9	recruitment_countries	{}
ef0fbc6785604dc48fe73278f7a47dda	d434fdbff63c4317bba6088a9143fb40	recruitment_countries	{}
d8deffd078f74c89b457733561542bc1	b204af8b84084ada993875e3c41eeeb3	recruitment_countries	{}
44e8a55bbd884df789c47b8d4146508b	127c1d9ef08d4058a1af6b699adc33a6	recruitment_countries	{}
50f63fb57e0445638b743f1c06fb1547	22be7599112045caa099dca25d909dbf	recruitment_countries	{}
c7ac461d58ac46eb9a30d7025ba98712	da0156d584de42c687462b5652476845	recruitment_countries	{}
db81c2a190cc48028e3bace7ded87ded	b204af8b84084ada993875e3c41eeeb3	recruitment_countries	{}
5ef35ba17e1c48899536232b7d71702e	07f0bc1855354eb0ab31629964ea6d3a	recruitment_countries	{}
cb55ffe1d7e94719b6a90b460284e94b	6fe3e8b5a2a445a3b641dd10ba8791c1	recruitment_countries	{}
b264cf2293df4b24adf4d53ab94ff6c2	d434fdbff63c4317bba6088a9143fb40	recruitment_countries	{}
ab4c1894ac1c471e97ff3d90678ebab1	2d86baea02f2401aa971b8538a7f5afc	recruitment_countries	{}
536dc8fb46074292b3c0df85b3f0ac59	2337302ab55f4c6281dfebc9dcdfa0ec	recruitment_countries	{}
\.


--
-- TOC entry 3074 (class 0 OID 24282)
-- Dependencies: 185
-- Data for Name: trial_organisation; Type: TABLE DATA; Schema: public; Owner: opentrials
--

COPY trial_organisation (trial_uuid, organisation_uuid, role, context) FROM stdin;
53ff08be34ff44e19554c980e6c2dddb	03815e045b6c4ba4bef3391c2d1f12d5	primary_sponsor	{}
44b69aa9f0b3405b9b3c538068f3f074	03815e045b6c4ba4bef3391c2d1f12d5	primary_sponsor	{}
d1de51d8fe8e459090da7be435e870a4	03815e045b6c4ba4bef3391c2d1f12d5	primary_sponsor	{}
ec0af25421a14d76bccef2597e738cb2	b8cacfcf581e4379a3e71e80cb3a2a0b	primary_sponsor	{}
15d338c686c94190a5762b91cc54a223	b8cacfcf581e4379a3e71e80cb3a2a0b	primary_sponsor	{}
11184694aa97459280d37318a5c71cb7	b8cacfcf581e4379a3e71e80cb3a2a0b	primary_sponsor	{}
61722e86e4914bbeb905f135146a904f	c483b0e0aaad487881aafb9e2088c5bc	primary_sponsor	{}
ceaedb02971c478aa16f9b745b15b102	b8cacfcf581e4379a3e71e80cb3a2a0b	primary_sponsor	{}
ebd88f3f3e4b46328a6b786307c41521	b8cacfcf581e4379a3e71e80cb3a2a0b	primary_sponsor	{}
b00153a39c094953bba31fbf66441621	a78c07aeacb14b159ecb3f8012dae83d	primary_sponsor	{}
c881db91c82a4e1eb6466d0dbf4ca8ed	b8cacfcf581e4379a3e71e80cb3a2a0b	primary_sponsor	{}
442a08b9147a4a4db549a48acb7708f4	0221fc4389b04de996d1b30bd578c751	primary_sponsor	{}
ac5ccbaf949f4353bfd7b8d7cbbb70fc	b8cacfcf581e4379a3e71e80cb3a2a0b	primary_sponsor	{}
1a54f4e1103445b882ca69869c6eda02	03815e045b6c4ba4bef3391c2d1f12d5	primary_sponsor	{}
52e1e17626e349b0a3feb1c9776b2d6c	7c7c0d5a6dac47988dc148b43d3c3893	primary_sponsor	{}
74d612a1e139412c8d678a45dd735bae	db1fd15b3ffa4f5fbd5c9330035f861d	primary_sponsor	{}
e2abfff79c3547c7b6ae35733efa306a	49b6ec893f70434fa57f6322d0e3eb15	primary_sponsor	{}
25d6cb4e3db1409aaeb6b8779e873f27	b8cacfcf581e4379a3e71e80cb3a2a0b	primary_sponsor	{}
e93439dee88249fb93d9e3a038d3bd9a	e18020c1d1d44f4a9a4147aab842fb16	primary_sponsor	{}
cee9487fc21545d38a9bce118c3ab8f4	76416694638b48ce891f91b361e0903d	primary_sponsor	{}
df8e3de108ba464fa10485b35999725b	255be92d14274467903f1d4287da5823	primary_sponsor	{}
01feee5811754170917068f8f40027d0	41a8ee95769b4fb080ef7a4a4e33faf4	primary_sponsor	{}
7371e77b756145728b4655fd0cdc4722	aeeb5624110b49a08a1667d1adf6b789	primary_sponsor	{}
6c02563e661a4dada5e55d1f9935d803	00cf321b551e4e5a8d0362e07f7434ba	primary_sponsor	{}
f9957d004f1e4250abfa0f94d9ee3927	7d3be9ab085045aeb0e879518ebd3acc	primary_sponsor	{}
b0fb783f005841acbc4f462688e2473a	eb5415c2b5fa408c99bbf581818b7261	primary_sponsor	{}
cd359a56c95442d4a5f78034be23e9de	c4f70b921c06433e82c8631256ae2d1e	primary_sponsor	{}
e6809e6d890345bf845db683fc93de82	4ec33605b1cb48a4b51b100d58d191e5	primary_sponsor	{}
89d86c6d50b943f783b2a43f3cba28df	98ccfa2d39dd44f9804f9f767fbff069	primary_sponsor	{}
3d331c8ffb334c369ff0b954d64416d5	78f766c6308a499f84db6f711cdf88d8	primary_sponsor	{}
ef64787040504d2f985625b8527c3cca	c0e5d38362da4cfba3992287f83ef34d	primary_sponsor	{}
ce125881b9ce40d9afbb7ee749283a06	6930ebf38495452f9136221d0ac11d7d	primary_sponsor	{}
9802d765c6744a949123c3f21415213a	57cc21ecbd234a5fbd9eb575ac9af3c7	primary_sponsor	{}
a3f2a4c44c0c4104a0b228a675f241fd	becceb4e85f745ddbe937c1ebe4f351d	primary_sponsor	{}
1cfc3d6219cf465ca8f1f580fc1e578d	b8cacfcf581e4379a3e71e80cb3a2a0b	primary_sponsor	{}
ef0fbc6785604dc48fe73278f7a47dda	93c2c4da5f6143afbbde069ac1fa5bdc	primary_sponsor	{}
d8deffd078f74c89b457733561542bc1	3316c9a598ba43e78cb2fff8bc78dffb	primary_sponsor	{}
eb4b257db321499a9f18b975c3c856b5	318f942ce0754397a846cdcb86aea027	primary_sponsor	{}
44e8a55bbd884df789c47b8d4146508b	3cdb545e1c5b448bb8fcd9b6816d3dd9	primary_sponsor	{}
50f63fb57e0445638b743f1c06fb1547	0768ae9ad2fd46be81f1a9f478bc1f97	primary_sponsor	{}
c7ac461d58ac46eb9a30d7025ba98712	adbe86134a3a44cfb472c9d61ed70552	primary_sponsor	{}
de5b8a97b1a743baa9467ee30d1b2311	e2180cf12a46485880f1350f4ec90b0e	primary_sponsor	{}
db81c2a190cc48028e3bace7ded87ded	9122f1a11ac54142b99c26beab20d880	primary_sponsor	{}
025d2bb5b38448c88e5bedf9ee8289a3	e6922a13b4874c33919fe22a13fdf273	primary_sponsor	{}
7ed0e81400fc4326acdc75d79e83427a	96f9594713f743e887d68c29a6096ceb	primary_sponsor	{}
5ef35ba17e1c48899536232b7d71702e	be55c5c4779248168584cb2b372830c1	primary_sponsor	{}
cb55ffe1d7e94719b6a90b460284e94b	21e42343ae7f41abb58184c3550bf0bb	primary_sponsor	{}
b264cf2293df4b24adf4d53ab94ff6c2	9927ec0b579d4e7dbd2754eab55769ee	primary_sponsor	{}
ab4c1894ac1c471e97ff3d90678ebab1	58fc9543c620453f94f721caebfb5fcd	primary_sponsor	{}
536dc8fb46074292b3c0df85b3f0ac59	4735b27e7cc14b4b8c5a949ca2b6ef36	primary_sponsor	{}
\.


--
-- TOC entry 3069 (class 0 OID 24200)
-- Dependencies: 180
-- Data for Name: trial_person; Type: TABLE DATA; Schema: public; Owner: opentrials
--

COPY trial_person (trial_uuid, person_uuid, role, context) FROM stdin;
53ff08be34ff44e19554c980e6c2dddb	5aa78b08e4334f5cbf5cfa271f121041	principal_investigator	{}
44b69aa9f0b3405b9b3c538068f3f074	5aa78b08e4334f5cbf5cfa271f121041	principal_investigator	{}
d1de51d8fe8e459090da7be435e870a4	5aa78b08e4334f5cbf5cfa271f121041	principal_investigator	{}
ec0af25421a14d76bccef2597e738cb2	2df809b9dff44c54abaf7023a62e5c06	principal_investigator	{}
15d338c686c94190a5762b91cc54a223	f69c94aa39c04496accf2c8e0b05a4d4	principal_investigator	{}
11184694aa97459280d37318a5c71cb7	e6ccd9b124624093ab7e700a084a1fce	principal_investigator	{}
11184694aa97459280d37318a5c71cb7	f69c94aa39c04496accf2c8e0b05a4d4	principal_investigator	{}
61722e86e4914bbeb905f135146a904f	334fda8be1314b9da3a4d3f2e9ce77fa	principal_investigator	{}
ceaedb02971c478aa16f9b745b15b102	f69c94aa39c04496accf2c8e0b05a4d4	principal_investigator	{}
ceaedb02971c478aa16f9b745b15b102	d62038e64da7456c84abdefd0c661929	principal_investigator	{}
ebd88f3f3e4b46328a6b786307c41521	f69c94aa39c04496accf2c8e0b05a4d4	principal_investigator	{}
b00153a39c094953bba31fbf66441621	fdc37a9b8e3d44f8b0188f93abfa104e	principal_investigator	{}
c881db91c82a4e1eb6466d0dbf4ca8ed	2df809b9dff44c54abaf7023a62e5c06	principal_investigator	{}
442a08b9147a4a4db549a48acb7708f4	a18640ecb10f4eeb8eafae9a334f1570	principal_investigator	{}
ac5ccbaf949f4353bfd7b8d7cbbb70fc	f69c94aa39c04496accf2c8e0b05a4d4	principal_investigator	{}
1a54f4e1103445b882ca69869c6eda02	5aa78b08e4334f5cbf5cfa271f121041	principal_investigator	{}
52e1e17626e349b0a3feb1c9776b2d6c	e10b9bb0254644bf806710d63d4dd0af	principal_investigator	{}
74d612a1e139412c8d678a45dd735bae	fb212854869e422a82c1372c0cf6ad0f	principal_investigator	{}
e2abfff79c3547c7b6ae35733efa306a	bb7f42120cfc4007b9f64eb2b8ff86c0	principal_investigator	{}
e93439dee88249fb93d9e3a038d3bd9a	2751857c81924a728c5549d42171262d	principal_investigator	{}
7371e77b756145728b4655fd0cdc4722	049bc3c01ff54dcca4dfec7fcaf76101	principal_investigator	{}
6c02563e661a4dada5e55d1f9935d803	162fb3ac658c455fa2b60965f1f28dac	principal_investigator	{}
f9957d004f1e4250abfa0f94d9ee3927	7ef6b944ef0948a9bea600b6faa40b4a	principal_investigator	{}
b0fb783f005841acbc4f462688e2473a	e99e246a7b154289b79a98a1a34fddbb	principal_investigator	{}
cd359a56c95442d4a5f78034be23e9de	19b782ed88224a1ea56d16f640e8e4fc	principal_investigator	{}
89d86c6d50b943f783b2a43f3cba28df	b88a94cb5fc14ad7914bfeaa2fef4fbf	principal_investigator	{}
3d331c8ffb334c369ff0b954d64416d5	ea89c10997b041649cdd2012e2f75c1b	principal_investigator	{}
a3f2a4c44c0c4104a0b228a675f241fd	2d8b790d6a5f4ae1bc95fc8d7c693df1	principal_investigator	{}
1cfc3d6219cf465ca8f1f580fc1e578d	2df809b9dff44c54abaf7023a62e5c06	principal_investigator	{}
ef0fbc6785604dc48fe73278f7a47dda	acf67b8b267c4fc5b050aeac54fc0012	principal_investigator	{}
d8deffd078f74c89b457733561542bc1	d253bc19203c47eb993ac7bb02e188f0	principal_investigator	{}
44e8a55bbd884df789c47b8d4146508b	244316ac33cc41cfa29cf81723c8dbf5	principal_investigator	{}
50f63fb57e0445638b743f1c06fb1547	70c0d2de05444d5ca60e4f26a1b6c6c4	principal_investigator	{}
50f63fb57e0445638b743f1c06fb1547	b5140f493eea4dfda02de41d31703607	principal_investigator	{}
50f63fb57e0445638b743f1c06fb1547	d2e32efdb6b9453ab51621a42f03eba7	principal_investigator	{}
c7ac461d58ac46eb9a30d7025ba98712	18e38b2a89844093b6f0bbbb2a2b05ec	principal_investigator	{}
de5b8a97b1a743baa9467ee30d1b2311	a4590991d1ca4052a1aaef028632b780	principal_investigator	{}
db81c2a190cc48028e3bace7ded87ded	1a3bcee9da794b49b29e893f001352be	principal_investigator	{}
5ef35ba17e1c48899536232b7d71702e	f8672a130503472194431f12f677deb9	principal_investigator	{}
cb55ffe1d7e94719b6a90b460284e94b	5065526551e74ab68a9e933b89e014a4	principal_investigator	{}
ab4c1894ac1c471e97ff3d90678ebab1	fd969e7040724496b5bb4138ead4b407	principal_investigator	{}
\.


--
-- TOC entry 3070 (class 0 OID 24218)
-- Dependencies: 181
-- Data for Name: trial_problem; Type: TABLE DATA; Schema: public; Owner: opentrials
--

COPY trial_problem (trial_uuid, problem_uuid, role, context) FROM stdin;
53ff08be34ff44e19554c980e6c2dddb	14121de3fdbf47c8af8d3d3df86083c9	\N	{}
44b69aa9f0b3405b9b3c538068f3f074	8ade1b55bd6f4e53a207476c29a40f6d	\N	{}
d1de51d8fe8e459090da7be435e870a4	f88466d7336f436fbdb30228a84dad0b	\N	{}
d1de51d8fe8e459090da7be435e870a4	388759ea52f7474f849fe948302aa4e9	\N	{}
d1de51d8fe8e459090da7be435e870a4	46db163ce97c44e8b9e0fde4efc82b8a	\N	{}
d1de51d8fe8e459090da7be435e870a4	7bd2d89a8e404661bb13b1aaafc1a550	\N	{}
ec0af25421a14d76bccef2597e738cb2	354c114a67df4f6cb3a5cc8d6a00a795	\N	{}
15d338c686c94190a5762b91cc54a223	677157d36e644477a011b6081473c48d	\N	{}
15d338c686c94190a5762b91cc54a223	b43b22e101694a56bae74baa6a99523e	\N	{}
11184694aa97459280d37318a5c71cb7	3f7e775451e4471da92b88528c27e725	\N	{}
61722e86e4914bbeb905f135146a904f	215b20219be14696aeda647c29f02b59	\N	{}
61722e86e4914bbeb905f135146a904f	043dbafcaeab4a2b8fa5858fbb1f4032	\N	{}
ceaedb02971c478aa16f9b745b15b102	64fef3b80ae342d6b509802c32b3996e	\N	{}
ebd88f3f3e4b46328a6b786307c41521	677157d36e644477a011b6081473c48d	\N	{}
ebd88f3f3e4b46328a6b786307c41521	2042106c7720405994eee98f56a88410	\N	{}
b00153a39c094953bba31fbf66441621	51f9134483fa4e9b9540328fb7513f67	\N	{}
c881db91c82a4e1eb6466d0dbf4ca8ed	7e0fd9f688564de8af15e57ce6fef2fb	\N	{}
c881db91c82a4e1eb6466d0dbf4ca8ed	2042106c7720405994eee98f56a88410	\N	{}
442a08b9147a4a4db549a48acb7708f4	72e9452dbc7c418b8f86a6da94945f44	\N	{}
442a08b9147a4a4db549a48acb7708f4	d087d85b19ba4e5ab6836b6828bedec8	\N	{}
ac5ccbaf949f4353bfd7b8d7cbbb70fc	b05484c7ebf44222818afb269a2e2499	\N	{}
ac5ccbaf949f4353bfd7b8d7cbbb70fc	677157d36e644477a011b6081473c48d	\N	{}
1a54f4e1103445b882ca69869c6eda02	5218ada4ed0a400f869b7c3771761217	\N	{}
52e1e17626e349b0a3feb1c9776b2d6c	9bdac79453a34886abed7901d9796ef8	\N	{}
74d612a1e139412c8d678a45dd735bae	8111e1aaf2da4fb788d4531ca97499a9	\N	{}
74d612a1e139412c8d678a45dd735bae	c5d388fcd6024e2fa2a9a3c57ca6d9a5	\N	{}
74d612a1e139412c8d678a45dd735bae	38859b6577da42fd936f71acef462d50	\N	{}
74d612a1e139412c8d678a45dd735bae	a4f4c06d492f49ffaea81c0eaa64720b	\N	{}
e2abfff79c3547c7b6ae35733efa306a	c72eaec657eb4199bcca43b68a0ea526	\N	{}
25d6cb4e3db1409aaeb6b8779e873f27	b80ed90c0fdd4903b30fbbb27020c1d8	\N	{}
e93439dee88249fb93d9e3a038d3bd9a	29bfe06aa1f54b168687eae954f2a421	\N	{}
cee9487fc21545d38a9bce118c3ab8f4	88a8f5c3f94a48abbffe72131b6e9be1	\N	{}
df8e3de108ba464fa10485b35999725b	d06f804a410e47e5a40870f9f21a8e47	\N	{}
01feee5811754170917068f8f40027d0	6bfa0686cbb14c4787444716b26aad9a	\N	{}
7371e77b756145728b4655fd0cdc4722	bb07784fa6474dcfadac6215aa34c412	\N	{}
6c02563e661a4dada5e55d1f9935d803	ca4d89b7348c4db2968fb399b792584f	\N	{}
6c02563e661a4dada5e55d1f9935d803	65e1a2d10cdd4b9cbf50c468ba403bb5	\N	{}
f9957d004f1e4250abfa0f94d9ee3927	d5de1b23c22c4d1d88b4f7f7936cd9a7	\N	{}
b0fb783f005841acbc4f462688e2473a	39167eadc5044a5d804e56570d9d7450	\N	{}
cd359a56c95442d4a5f78034be23e9de	32a3697fd7f24ffdae5a63f8367e6880	\N	{}
cd359a56c95442d4a5f78034be23e9de	a3175e00a4044b17a53dd9946db0fd3d	\N	{}
cd359a56c95442d4a5f78034be23e9de	c3ca293459484d9199c7cf6fd07f5937	\N	{}
e6809e6d890345bf845db683fc93de82	2a55ed2821c34cb8b31a910096bcdffb	\N	{}
89d86c6d50b943f783b2a43f3cba28df	8b99c1d6d7d34137882058c1435028f4	\N	{}
3d331c8ffb334c369ff0b954d64416d5	6654f996c23647c2b69816b2da9a6721	\N	{}
3d331c8ffb334c369ff0b954d64416d5	29a38a36175149a185031adb89295c11	\N	{}
3d331c8ffb334c369ff0b954d64416d5	17d61122f429428ab834178e2b6c5738	\N	{}
3d331c8ffb334c369ff0b954d64416d5	1b910b28daf946e282ac9c38de56c6ce	\N	{}
3d331c8ffb334c369ff0b954d64416d5	f175e36b8f3a4c97a5d963702a5baceb	\N	{}
ef64787040504d2f985625b8527c3cca	d85d64b862af452ea9eefa5e8da2c414	\N	{}
ef64787040504d2f985625b8527c3cca	0c119a3cf39a40e89412adb33ed4af31	\N	{}
ce125881b9ce40d9afbb7ee749283a06	cf68a1b9dbbd48d5aa62d7db753ddcdb	\N	{}
ce125881b9ce40d9afbb7ee749283a06	2f4dddd5a35a4c8d85402131aedbef11	\N	{}
9802d765c6744a949123c3f21415213a	2e287956579a4d11ae1eddc9bef3c8a1	\N	{}
a3f2a4c44c0c4104a0b228a675f241fd	78b17042f6e247c69b8fef8e77a1ec04	\N	{}
1cfc3d6219cf465ca8f1f580fc1e578d	457cc40b68614a579ecc9d4ad7e6aba3	\N	{}
ef0fbc6785604dc48fe73278f7a47dda	d7d09d597fde401ab4c21c0df0a4f88a	\N	{}
d8deffd078f74c89b457733561542bc1	1972745fcb1f477fa7a4f54af36d485a	\N	{}
d8deffd078f74c89b457733561542bc1	db27aab89bf141ec9f22d9523bf93e78	\N	{}
d8deffd078f74c89b457733561542bc1	2429e2e3a56948ffba0d572ecc59785a	\N	{}
eb4b257db321499a9f18b975c3c856b5	fe7f70f980aa43ce8dcf0dccbf277a4d	\N	{}
44e8a55bbd884df789c47b8d4146508b	ac73f4a609444f2f8842b2e06c93a810	\N	{}
50f63fb57e0445638b743f1c06fb1547	d387f9b715ee421dbb8dcf6f0a86434f	\N	{}
c7ac461d58ac46eb9a30d7025ba98712	2e4bd27c02ce40e8beb4dea437f59854	\N	{}
de5b8a97b1a743baa9467ee30d1b2311	d40afb1908184a59b377d48279c90e84	\N	{}
db81c2a190cc48028e3bace7ded87ded	67c5e848cb21459eb4d1066989392b0d	\N	{}
025d2bb5b38448c88e5bedf9ee8289a3	8d0964a33d0f4069a2278dcae698aed2	\N	{}
7ed0e81400fc4326acdc75d79e83427a	78b17042f6e247c69b8fef8e77a1ec04	\N	{}
5ef35ba17e1c48899536232b7d71702e	aee82d5225e24dd9bf2bd1a6136794c5	\N	{}
5ef35ba17e1c48899536232b7d71702e	8c6f5144786f49129a8f2b46f0a3ddd2	\N	{}
5ef35ba17e1c48899536232b7d71702e	d04f156c7cec452f86d9d7b2a7d507c3	\N	{}
5ef35ba17e1c48899536232b7d71702e	32a3697fd7f24ffdae5a63f8367e6880	\N	{}
5ef35ba17e1c48899536232b7d71702e	752a63e1933c46428f10987ad45a21f0	\N	{}
cb55ffe1d7e94719b6a90b460284e94b	89a287cfba5f4a87a0da7586902aded3	\N	{}
b264cf2293df4b24adf4d53ab94ff6c2	c14fe62259144aaa8178b8eb240c638f	\N	{}
ab4c1894ac1c471e97ff3d90678ebab1	9feab24f62b6405c96bef8712c6f2d3d	\N	{}
536dc8fb46074292b3c0df85b3f0ac59	502770061a6047a4abbc19b3186b59cf	\N	{}
\.


--
-- TOC entry 3076 (class 0 OID 24318)
-- Dependencies: 187
-- Data for Name: trial_publication; Type: TABLE DATA; Schema: public; Owner: opentrials
--

COPY trial_publication (trial_uuid, publication_uuid, role, context) FROM stdin;
\.


--
-- TOC entry 3078 (class 0 OID 24354)
-- Dependencies: 189
-- Data for Name: trial_record; Type: TABLE DATA; Schema: public; Owner: opentrials
--

COPY trial_record (trial_uuid, record_uuid, role, context) FROM stdin;
53ff08be34ff44e19554c980e6c2dddb	b3b596f3c7cb4e9b8916b9f2a6274c71	primary	{}
44b69aa9f0b3405b9b3c538068f3f074	79ba1736e648475193ce1f196e4ea2f8	primary	{}
d1de51d8fe8e459090da7be435e870a4	707dc929e6994b6aa35efcf66248a330	primary	{}
ec0af25421a14d76bccef2597e738cb2	bd78310fa6244d4d99f9dd7ddc0976c4	primary	{}
15d338c686c94190a5762b91cc54a223	bcb072d0446740d0a502c5855ca73b7d	primary	{}
11184694aa97459280d37318a5c71cb7	04d56142704a4fc29744798d61b9fe15	primary	{}
61722e86e4914bbeb905f135146a904f	4972c057e5a9458da7f628c01fd49ffe	primary	{}
ceaedb02971c478aa16f9b745b15b102	e0a1119082b446d7b6663e4a28133b10	primary	{}
ebd88f3f3e4b46328a6b786307c41521	2cda92a44a5a495bbd7db0bf2d24a443	primary	{}
b00153a39c094953bba31fbf66441621	e32be195032a48b9925ae07096fd86ff	primary	{}
c881db91c82a4e1eb6466d0dbf4ca8ed	ebf0ae74a20940aeaab1512067bb0a31	primary	{}
442a08b9147a4a4db549a48acb7708f4	d6514f1c9e9040abab8f083966dfecb1	primary	{}
ac5ccbaf949f4353bfd7b8d7cbbb70fc	c22f1839c45443b992d79c2ee90aecff	primary	{}
1a54f4e1103445b882ca69869c6eda02	4dc4b5dcc5b4449faa97102ebabdfe5d	primary	{}
52e1e17626e349b0a3feb1c9776b2d6c	91c2da63b51142ada672b2e9510b91c3	primary	{}
74d612a1e139412c8d678a45dd735bae	e2c6d9345c264ad28904e86cc17ddf21	primary	{}
e2abfff79c3547c7b6ae35733efa306a	b4ea74619ccf41398ac8e2fbace91215	primary	{}
25d6cb4e3db1409aaeb6b8779e873f27	981dde3f56084f0aa8e7de63ee4d0243	primary	{}
e93439dee88249fb93d9e3a038d3bd9a	c1b7bc9ae88e44f7b6f72306fa19b2ab	primary	{}
cee9487fc21545d38a9bce118c3ab8f4	d8b7d2a726af4c599acfaeccca73fb5d	primary	{}
df8e3de108ba464fa10485b35999725b	0f3d2634ccbe4c9ca06b09a9d9be205d	primary	{}
01feee5811754170917068f8f40027d0	9872bc9c248a4f70b48a4e0f73268765	primary	{}
7371e77b756145728b4655fd0cdc4722	6105e968d2bc43b1bf65b75f6077068f	primary	{}
6c02563e661a4dada5e55d1f9935d803	9f255eb081cf435fbc7c09e156f37435	primary	{}
f9957d004f1e4250abfa0f94d9ee3927	d6c9d5dddebc428197815dae794861bb	primary	{}
b0fb783f005841acbc4f462688e2473a	bad1cf9c0d8a45e781b701b5110dd821	primary	{}
cd359a56c95442d4a5f78034be23e9de	c3ec0ddde2c74c8cb163024a9ad79026	primary	{}
e6809e6d890345bf845db683fc93de82	ef7c6e2cedfd4997b1349f1cfc390804	primary	{}
89d86c6d50b943f783b2a43f3cba28df	79cdbaa6205146729a48730b4b61bb1f	primary	{}
3d331c8ffb334c369ff0b954d64416d5	b3aded779a6e4184bff1a3a3a7bb2c28	primary	{}
ef64787040504d2f985625b8527c3cca	32a18e8c10314943a3edc577175e800f	primary	{}
ce125881b9ce40d9afbb7ee749283a06	5102dd224de841429b5de1df2c77fddb	primary	{}
9802d765c6744a949123c3f21415213a	be51d4f55d8d45e7a07efac063eb6492	primary	{}
a3f2a4c44c0c4104a0b228a675f241fd	5cdd6a1fcfbc466db1af6d85c6cdd303	primary	{}
1cfc3d6219cf465ca8f1f580fc1e578d	977234215f03499c97d98ed378a7a8e9	primary	{}
ef0fbc6785604dc48fe73278f7a47dda	1213f73b315b4e50bc73c02565dd1e1c	primary	{}
d8deffd078f74c89b457733561542bc1	658b2faefee347e2bfdfa0072a5c2b2b	primary	{}
eb4b257db321499a9f18b975c3c856b5	74525092d5dc4af3898f98dacb245f0b	primary	{}
44e8a55bbd884df789c47b8d4146508b	d9ec0bd4ec1f475f9c97ecc008c85baa	primary	{}
50f63fb57e0445638b743f1c06fb1547	ae4ec70b4a14435abe4bf7c59bb2285d	primary	{}
c7ac461d58ac46eb9a30d7025ba98712	d27f6d1b2f414365b556314478d2acfb	primary	{}
de5b8a97b1a743baa9467ee30d1b2311	120e83ac9e514cc5a13554b256ce6042	primary	{}
db81c2a190cc48028e3bace7ded87ded	e9f360916a104c31beecc027bdfe580d	primary	{}
025d2bb5b38448c88e5bedf9ee8289a3	c337994f120d4f03bc1c3086540044a0	primary	{}
7ed0e81400fc4326acdc75d79e83427a	cb91e915c7c6413db44dfdde0e4d166b	primary	{}
5ef35ba17e1c48899536232b7d71702e	63fe6ffe2d82445dbbdd97840fab9a5b	primary	{}
cb55ffe1d7e94719b6a90b460284e94b	1e1e402d3156464bb95014b646f1a118	primary	{}
b264cf2293df4b24adf4d53ab94ff6c2	36831b78518e493bb1cd0d18a4ffd1ea	primary	{}
ab4c1894ac1c471e97ff3d90678ebab1	216661374e2647f089e918a90279ce33	primary	{}
536dc8fb46074292b3c0df85b3f0ac59	56a44f6a61c94a2b8e55993c27219b4a	primary	{}
\.


--
-- TOC entry 2918 (class 2606 OID 24258)
-- Name: document_name_type_key; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY document
    ADD CONSTRAINT document_name_type_key UNIQUE (name, type);


--
-- TOC entry 2920 (class 2606 OID 24256)
-- Name: document_pkey; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY document
    ADD CONSTRAINT document_pkey PRIMARY KEY (uuid);


--
-- TOC entry 2880 (class 2606 OID 24124)
-- Name: intervention_name_type_key; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY intervention
    ADD CONSTRAINT intervention_name_type_key UNIQUE (name, type);


--
-- TOC entry 2882 (class 2606 OID 24122)
-- Name: intervention_pkey; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY intervention
    ADD CONSTRAINT intervention_pkey PRIMARY KEY (uuid);


--
-- TOC entry 2900 (class 2606 OID 24174)
-- Name: location_name_type_key; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY location
    ADD CONSTRAINT location_name_type_key UNIQUE (name, type);


--
-- TOC entry 2902 (class 2606 OID 24172)
-- Name: location_pkey; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY location
    ADD CONSTRAINT location_pkey PRIMARY KEY (uuid);


--
-- TOC entry 2904 (class 2606 OID 24184)
-- Name: organisation_name_key; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY organisation
    ADD CONSTRAINT organisation_name_key UNIQUE (name);


--
-- TOC entry 2906 (class 2606 OID 24182)
-- Name: organisation_pkey; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY organisation
    ADD CONSTRAINT organisation_pkey PRIMARY KEY (uuid);


--
-- TOC entry 2884 (class 2606 OID 24134)
-- Name: person_name_key; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY person
    ADD CONSTRAINT person_name_key UNIQUE (name);


--
-- TOC entry 2886 (class 2606 OID 24132)
-- Name: person_pkey; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY person
    ADD CONSTRAINT person_pkey PRIMARY KEY (uuid);


--
-- TOC entry 2896 (class 2606 OID 24164)
-- Name: problem_name_type_key; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY problem
    ADD CONSTRAINT problem_name_type_key UNIQUE (name, type);


--
-- TOC entry 2898 (class 2606 OID 24162)
-- Name: problem_pkey; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY problem
    ADD CONSTRAINT problem_pkey PRIMARY KEY (uuid);


--
-- TOC entry 2908 (class 2606 OID 24194)
-- Name: publication_name_type_key; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY publication
    ADD CONSTRAINT publication_name_type_key UNIQUE (name, type);


--
-- TOC entry 2910 (class 2606 OID 24192)
-- Name: publication_pkey; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY publication
    ADD CONSTRAINT publication_pkey PRIMARY KEY (uuid);


--
-- TOC entry 2916 (class 2606 OID 24243)
-- Name: record_pkey; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY record
    ADD CONSTRAINT record_pkey PRIMARY KEY (uuid);


--
-- TOC entry 2892 (class 2606 OID 24154)
-- Name: source_name_type_key; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY source
    ADD CONSTRAINT source_name_type_key UNIQUE (name, type);


--
-- TOC entry 2894 (class 2606 OID 24152)
-- Name: source_pkey; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY source
    ADD CONSTRAINT source_pkey PRIMARY KEY (uuid);


--
-- TOC entry 2930 (class 2606 OID 24343)
-- Name: trial_document_pkey; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY trial_document
    ADD CONSTRAINT trial_document_pkey PRIMARY KEY (trial_uuid, document_uuid);


--
-- TOC entry 2926 (class 2606 OID 24307)
-- Name: trial_intervention_pkey; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY trial_intervention
    ADD CONSTRAINT trial_intervention_pkey PRIMARY KEY (trial_uuid, intervention_uuid);


--
-- TOC entry 2922 (class 2606 OID 24271)
-- Name: trial_location_pkey; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY trial_location
    ADD CONSTRAINT trial_location_pkey PRIMARY KEY (trial_uuid, location_uuid);


--
-- TOC entry 2924 (class 2606 OID 24289)
-- Name: trial_organisation_pkey; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY trial_organisation
    ADD CONSTRAINT trial_organisation_pkey PRIMARY KEY (trial_uuid, organisation_uuid);


--
-- TOC entry 2912 (class 2606 OID 24207)
-- Name: trial_person_pkey; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY trial_person
    ADD CONSTRAINT trial_person_pkey PRIMARY KEY (trial_uuid, person_uuid);


--
-- TOC entry 2888 (class 2606 OID 24142)
-- Name: trial_pkey; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY trial
    ADD CONSTRAINT trial_pkey PRIMARY KEY (uuid);


--
-- TOC entry 2890 (class 2606 OID 24144)
-- Name: trial_primary_register_primary_id_key; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY trial
    ADD CONSTRAINT trial_primary_register_primary_id_key UNIQUE (primary_register, primary_id);


--
-- TOC entry 2914 (class 2606 OID 24225)
-- Name: trial_problem_pkey; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY trial_problem
    ADD CONSTRAINT trial_problem_pkey PRIMARY KEY (trial_uuid, problem_uuid);


--
-- TOC entry 2928 (class 2606 OID 24325)
-- Name: trial_publication_pkey; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY trial_publication
    ADD CONSTRAINT trial_publication_pkey PRIMARY KEY (trial_uuid, publication_uuid);


--
-- TOC entry 2932 (class 2606 OID 24361)
-- Name: trial_record_pkey; Type: CONSTRAINT; Schema: public; Owner: opentrials; Tablespace: 
--

ALTER TABLE ONLY trial_record
    ADD CONSTRAINT trial_record_pkey PRIMARY KEY (trial_uuid, record_uuid);


--
-- TOC entry 2939 (class 2606 OID 24259)
-- Name: document_source_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: opentrials
--

ALTER TABLE ONLY document
    ADD CONSTRAINT document_source_uuid_fkey FOREIGN KEY (source_uuid) REFERENCES source(uuid);


--
-- TOC entry 2933 (class 2606 OID 24195)
-- Name: publication_source_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: opentrials
--

ALTER TABLE ONLY publication
    ADD CONSTRAINT publication_source_uuid_fkey FOREIGN KEY (source_uuid) REFERENCES source(uuid);


--
-- TOC entry 2938 (class 2606 OID 24244)
-- Name: record_source_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: opentrials
--

ALTER TABLE ONLY record
    ADD CONSTRAINT record_source_uuid_fkey FOREIGN KEY (source_uuid) REFERENCES source(uuid);


--
-- TOC entry 2949 (class 2606 OID 24349)
-- Name: trial_document_document_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: opentrials
--

ALTER TABLE ONLY trial_document
    ADD CONSTRAINT trial_document_document_uuid_fkey FOREIGN KEY (document_uuid) REFERENCES document(uuid);


--
-- TOC entry 2948 (class 2606 OID 24344)
-- Name: trial_document_trial_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: opentrials
--

ALTER TABLE ONLY trial_document
    ADD CONSTRAINT trial_document_trial_uuid_fkey FOREIGN KEY (trial_uuid) REFERENCES trial(uuid);


--
-- TOC entry 2945 (class 2606 OID 24313)
-- Name: trial_intervention_intervention_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: opentrials
--

ALTER TABLE ONLY trial_intervention
    ADD CONSTRAINT trial_intervention_intervention_uuid_fkey FOREIGN KEY (intervention_uuid) REFERENCES intervention(uuid);


--
-- TOC entry 2944 (class 2606 OID 24308)
-- Name: trial_intervention_trial_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: opentrials
--

ALTER TABLE ONLY trial_intervention
    ADD CONSTRAINT trial_intervention_trial_uuid_fkey FOREIGN KEY (trial_uuid) REFERENCES trial(uuid);


--
-- TOC entry 2941 (class 2606 OID 24277)
-- Name: trial_location_location_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: opentrials
--

ALTER TABLE ONLY trial_location
    ADD CONSTRAINT trial_location_location_uuid_fkey FOREIGN KEY (location_uuid) REFERENCES location(uuid);


--
-- TOC entry 2940 (class 2606 OID 24272)
-- Name: trial_location_trial_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: opentrials
--

ALTER TABLE ONLY trial_location
    ADD CONSTRAINT trial_location_trial_uuid_fkey FOREIGN KEY (trial_uuid) REFERENCES trial(uuid);


--
-- TOC entry 2943 (class 2606 OID 24295)
-- Name: trial_organisation_organisation_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: opentrials
--

ALTER TABLE ONLY trial_organisation
    ADD CONSTRAINT trial_organisation_organisation_uuid_fkey FOREIGN KEY (organisation_uuid) REFERENCES organisation(uuid);


--
-- TOC entry 2942 (class 2606 OID 24290)
-- Name: trial_organisation_trial_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: opentrials
--

ALTER TABLE ONLY trial_organisation
    ADD CONSTRAINT trial_organisation_trial_uuid_fkey FOREIGN KEY (trial_uuid) REFERENCES trial(uuid);


--
-- TOC entry 2935 (class 2606 OID 24213)
-- Name: trial_person_person_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: opentrials
--

ALTER TABLE ONLY trial_person
    ADD CONSTRAINT trial_person_person_uuid_fkey FOREIGN KEY (person_uuid) REFERENCES person(uuid);


--
-- TOC entry 2934 (class 2606 OID 24208)
-- Name: trial_person_trial_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: opentrials
--

ALTER TABLE ONLY trial_person
    ADD CONSTRAINT trial_person_trial_uuid_fkey FOREIGN KEY (trial_uuid) REFERENCES trial(uuid);


--
-- TOC entry 2937 (class 2606 OID 24231)
-- Name: trial_problem_problem_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: opentrials
--

ALTER TABLE ONLY trial_problem
    ADD CONSTRAINT trial_problem_problem_uuid_fkey FOREIGN KEY (problem_uuid) REFERENCES problem(uuid);


--
-- TOC entry 2936 (class 2606 OID 24226)
-- Name: trial_problem_trial_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: opentrials
--

ALTER TABLE ONLY trial_problem
    ADD CONSTRAINT trial_problem_trial_uuid_fkey FOREIGN KEY (trial_uuid) REFERENCES trial(uuid);


--
-- TOC entry 2947 (class 2606 OID 24331)
-- Name: trial_publication_publication_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: opentrials
--

ALTER TABLE ONLY trial_publication
    ADD CONSTRAINT trial_publication_publication_uuid_fkey FOREIGN KEY (publication_uuid) REFERENCES publication(uuid);


--
-- TOC entry 2946 (class 2606 OID 24326)
-- Name: trial_publication_trial_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: opentrials
--

ALTER TABLE ONLY trial_publication
    ADD CONSTRAINT trial_publication_trial_uuid_fkey FOREIGN KEY (trial_uuid) REFERENCES trial(uuid);


--
-- TOC entry 2951 (class 2606 OID 24367)
-- Name: trial_record_record_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: opentrials
--

ALTER TABLE ONLY trial_record
    ADD CONSTRAINT trial_record_record_uuid_fkey FOREIGN KEY (record_uuid) REFERENCES record(uuid);


--
-- TOC entry 2950 (class 2606 OID 24362)
-- Name: trial_record_trial_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: opentrials
--

ALTER TABLE ONLY trial_record
    ADD CONSTRAINT trial_record_trial_uuid_fkey FOREIGN KEY (trial_uuid) REFERENCES trial(uuid);


-- Completed on 2016-02-16 09:58:16 MSK

--
-- PostgreSQL database dump complete
--

