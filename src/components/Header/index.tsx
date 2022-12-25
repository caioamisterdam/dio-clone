import React from 'react'
import Logo from '../../assets/logo-dio.png';
import { Button } from '../Button';
import { UserPicture } from '../UserInfo/styles';

import {
    BuscarInputContainer,
    Container,
    Input,
    Menu,
    MenuRight,
    Row,
    Wrapper
} from './styles';
import { IHeader } from './types';

const Header = ({autenticado} : IHeader) => {
  return (
    <Wrapper>
        <Container>
            <Row>
                <img src={Logo} alt="Logo da Dio" />
                { autenticado ? (
                    <>
                        <BuscarInputContainer>
                            <Input placeholder="Buscar..." />
                        </BuscarInputContainer>
                        <Menu>Live Code</Menu>
                        <Menu>Global</Menu>
                    </>
                ) : null}

            </Row>
            <Row>
                {autenticado ? (
                    <UserPicture src="https://avatars.githubusercontent.com/u/45184516?v=4" />
                ) : (<>
                    <MenuRight>Home</MenuRight>
                    <Button title="Entrar"/>
                    <Button title="Cadastrar"/>
                    </>)
                            }

            </Row>
        </Container>
    </Wrapper>

  )
}

export { Header } 