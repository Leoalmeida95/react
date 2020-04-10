import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { withRouter } from 'react-router-dom';

import axios from 'axios';

class Login extends React.Component {

    state = {
        email: '',
        senha: '',
        mensagemErro: null
    }

    entrar = () => {
        axios.post('http://localhost:8080/api/usuarios/autenticar', {
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            //a informacao do usuario poderia ser salva em coockie ou localStorage
            //O localStorage é acessado somente no front, enquanto o coockie é também no back
            localStorage.setItem(
                                '_usuario_logado', 
                                JSON.stringify(response.data) //transforma o obj em string
                                )
            this.props.history.push('/');
        }).catch(erro => {
            this.setState({mensagemErro: erro.response.data})
        })
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuarios');
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                    <Card title='Login'>
                        <div className="row text-center">
                            <div className="alert alert-dismissible alert-danger">
                                <button type="button" className="close" data-dismiss="alert">&times;</button>
                                <strong>{this.state.mensagemErro}</strong>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <fieldset>
                                        <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                            <input type="email"
                                                value={this.state.email}
                                                onChange={e => this.setState({ email: e.target.value })}
                                                className="form-control" id="exampleInputEmail1"
                                                aria-describedby="emailHelp" placeholder="Digite o Email" />
                                        </FormGroup>
                                        <FormGroup label="Senha: *" htmlFor="exampleInputSenha1">
                                            <input type="password"
                                                value={this.state.senha}
                                                onChange={e => this.setState({ senha: e.target.value })}
                                                className="form-control" id="exampleInputSenha1"
                                                placeholder="Senha" />
                                        </FormGroup>
                                        <button onClick={this.entrar} className="btn btn-success">Entrar</button>
                                        <button onClick={this.prepareCadastrar} className="btn btn-warning">Cadastrar</button>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}

export default withRouter(Login) 