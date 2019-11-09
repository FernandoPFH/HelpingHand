import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, FlatList} from 'react-native';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      lista:[],
      refreshing:false
    };
    this.recarregar = this.recarregar.bind(this);
    this.deletar = this.deletar.bind(this);
    this.criarLista = this.criarLista.bind(this);
    this.getLista = this.getLista.bind(this);
  }

  async getLista() {

    let url="http://192.168.1.107:5000/";
    let urlload = url +"?adm=fernando&passw=ola";

    try{
      await fetch(urlload, {method: 'GET', headers:{'Accept':'application/json','Content-Type':'application/json'}}).then((response) => response.json()).then((responseJson)=>{return responseJson});
    }catch (error){
      console.log(error);
    }
  }

  recarregar(){
    this.setState({refreshing:true});
    let lista = this.getLista();
    alert(lista);
    this.setState({refreshing:false});
    //alert(dados_str);
    //this.setState({lista:lista});
  }

  deletar(item){
    let url="http://192.168.1.107:5000/";

    let urldelete = url +"?adm=fernando&passw=ola" + "&msm=" + item;

    fetch(urldelete, {method: 'HEAD'});
    let index = this.state.lista.indexOf(item);
    this.state.lista.splice(index,1);
  }

  criarLista(item){
    return(
      <View style={{flexDirection:'row', height:80}}>
        <TouchableOpacity onPress={()=>alert(item)}>
          <Text>Mensagem</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.deletar(item)}>
          <Text style={{width:80}}>X</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.View}>
        <View style={{height:60, backgroundColor:"#1E90FF", flexDirection: 'row'}}>
          <Text style={styles.Text}>Helping Hand</Text>
          <TouchableOpacity style={{width:60}} onPress={this.carregar} title="Enviar">
            <View style={styles.TOView}>
              <Text style={{alignSelf:"center"}}>Load</Text>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList data={this.state.lista} renderItem={({item})=>this.criarLista(item)} refreshing={this.state.refreshing} onRefresh={this.recarregar}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  View: {
    flex: 1,
    backgroundColor: '#00BFFF',
  },
  Text:{
    flex:1,
    margin:10,
    fontSize:25,
    alignSelf:"center",
    color: '#fff',
    paddingLeft:116
  },
  TextInput:{
    height: 240,
    width:360,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#fff',
    marginVertical:100,
    padding:1,
    alignSelf:"center",
  },
  TOView:{
    backgroundColor:'#1E90FF',
    flex:1,
    justifyContent:'center'
  }
});