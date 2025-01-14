PGDMP  ;                     |            malla_vial_db    16.4    16.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16397    malla_vial_db    DATABASE     �   CREATE DATABASE malla_vial_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE malla_vial_db;
                postgres    false            �            1259    16420    bordillo    TABLE     �   CREATE TABLE public.bordillo (
    id bigint NOT NULL,
    altura double precision,
    material character varying(50),
    segmento_id bigint
);
    DROP TABLE public.bordillo;
       public         heap    postgres    false            �            1259    16419    bordillo_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bordillo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.bordillo_id_seq;
       public          postgres    false    220            �           0    0    bordillo_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.bordillo_id_seq OWNED BY public.bordillo.id;
          public          postgres    false    219            �            1259    16408    calzada    TABLE     �   CREATE TABLE public.calzada (
    id bigint NOT NULL,
    tipo_pavimento character varying(50),
    ancho double precision,
    segmento_id bigint
);
    DROP TABLE public.calzada;
       public         heap    postgres    false            �            1259    16407    calzada_id_seq    SEQUENCE     �   CREATE SEQUENCE public.calzada_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.calzada_id_seq;
       public          postgres    false    218            �           0    0    calzada_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.calzada_id_seq OWNED BY public.calzada.id;
          public          postgres    false    217            �            1259    16399    segmento    TABLE     �   CREATE TABLE public.segmento (
    id bigint NOT NULL,
    numero_segmento character varying(20) NOT NULL,
    direccion character varying(100),
    longitud double precision
);
    DROP TABLE public.segmento;
       public         heap    postgres    false            �            1259    16398    segmento_id_seq    SEQUENCE     �   CREATE SEQUENCE public.segmento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.segmento_id_seq;
       public          postgres    false    216            �           0    0    segmento_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.segmento_id_seq OWNED BY public.segmento.id;
          public          postgres    false    215            &           2604    16455    bordillo id    DEFAULT     j   ALTER TABLE ONLY public.bordillo ALTER COLUMN id SET DEFAULT nextval('public.bordillo_id_seq'::regclass);
 :   ALTER TABLE public.bordillo ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            %           2604    16448 
   calzada id    DEFAULT     h   ALTER TABLE ONLY public.calzada ALTER COLUMN id SET DEFAULT nextval('public.calzada_id_seq'::regclass);
 9   ALTER TABLE public.calzada ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            $           2604    16431    segmento id    DEFAULT     j   ALTER TABLE ONLY public.segmento ALTER COLUMN id SET DEFAULT nextval('public.segmento_id_seq'::regclass);
 :   ALTER TABLE public.segmento ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �          0    16420    bordillo 
   TABLE DATA           E   COPY public.bordillo (id, altura, material, segmento_id) FROM stdin;
    public          postgres    false    220   �       �          0    16408    calzada 
   TABLE DATA           I   COPY public.calzada (id, tipo_pavimento, ancho, segmento_id) FROM stdin;
    public          postgres    false    218          �          0    16399    segmento 
   TABLE DATA           L   COPY public.segmento (id, numero_segmento, direccion, longitud) FROM stdin;
    public          postgres    false    216   7       �           0    0    bordillo_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.bordillo_id_seq', 2, true);
          public          postgres    false    219            �           0    0    calzada_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.calzada_id_seq', 2, true);
          public          postgres    false    217            �           0    0    segmento_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.segmento_id_seq', 3, true);
          public          postgres    false    215            ,           2606    16457    bordillo bordillo_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.bordillo
    ADD CONSTRAINT bordillo_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.bordillo DROP CONSTRAINT bordillo_pkey;
       public            postgres    false    220            *           2606    16450    calzada calzada_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.calzada
    ADD CONSTRAINT calzada_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.calzada DROP CONSTRAINT calzada_pkey;
       public            postgres    false    218            (           2606    16433    segmento segmento_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.segmento
    ADD CONSTRAINT segmento_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.segmento DROP CONSTRAINT segmento_pkey;
       public            postgres    false    216            .           2606    16471 "   bordillo bordillo_segmento_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.bordillo
    ADD CONSTRAINT bordillo_segmento_id_fkey FOREIGN KEY (segmento_id) REFERENCES public.segmento(id) ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.bordillo DROP CONSTRAINT bordillo_segmento_id_fkey;
       public          postgres    false    220    4648    216            -           2606    16462     calzada calzada_segmento_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.calzada
    ADD CONSTRAINT calzada_segmento_id_fkey FOREIGN KEY (segmento_id) REFERENCES public.segmento(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.calzada DROP CONSTRAINT calzada_segmento_id_fkey;
       public          postgres    false    216    4648    218            �   $   x�3�4�3�LN�M�+��4�2�4C�q��qqq ���      �   $   x�3�L,NK�)��4�3�4�2��M�|#�=... ��      �   U   x�3�600�t,K��LIT�PPV04�52�440�2I�%M�����f��\� IcN眜T#ceS']SSNSS�=... z��     