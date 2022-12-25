import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { MdEmail, MdLock, MdOutlinePersonOutline } from 'react-icons/md';
import React from "react";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { api } from '../../services/api';

import {
  Column,
  Container,
  CriarText,
  EsqueciText,
  Row,
  SubtitleLogin,
  Title,
  TitleLogin,
  Wrapper,
} from "./styles";
import { IFormData } from './types';

const schema = yup.object({
  name: yup.string().required('Campo obrigatório'),
  email: yup.string().email('e-mail não é válido.').required('Campo obrigatório'),
  password: yup.string().min(3, 'No mínimo 3 caracteres.').required('Campo obrigatório'),
}).required();

const SignUp = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors } } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
});

  const onSubmit = async (formData: IFormData)=> {
    try{
      const { data } = await api.get(`users?email=${formData.email}&senha=${formData.password}`);
      if (data.length === 1) {
        navigate('/feed')
      } else {
        alert('E-mail ou senha inválidos')
      } 
    } catch{
      alert('Houve um erro. Tente novamente')
    }
  };
  
  return (
    <>
      <Header />
      <Container>
        <Column>
          <Title>
            A plataforma para você aprender com experts, dominar as principais
            tecnologias e entrar mais rápido nos empresas mais desejadas.
          </Title>
        </Column>
        <Column>
          <Wrapper>
            <TitleLogin>Faça seu cadastro</TitleLogin>
            <SubtitleLogin>Faça seu login e make the change.</SubtitleLogin>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input name="name" errorMessage={errors?.name?.message} control={control} placeholder="Nome Completo" leftIcon={<MdOutlinePersonOutline />}/>
              <Input name="email" errorMessage={errors?.email?.message} control={control} placeholder="E-mail" leftIcon={<MdEmail />}/>
              <Input name="password" errorMessage={errors?.password?.message} control={control} placeholder="Senha" type="password" leftIcon={<MdLock />}/>
              <Button title="Criar minha conta" variant="secondary" type="submit" />
            </form>
            <Row>
              <SubtitleLogin>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</SubtitleLogin>
              </Row>
              <Row>
              <EsqueciText>Já tenho conta.</EsqueciText>
              <CriarText>Fazer Login</CriarText>
            </Row>
          </Wrapper>
        </Column>
      </Container>
    </>
  );
};

export { SignUp };
