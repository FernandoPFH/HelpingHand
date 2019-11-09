import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, TextInput, Text} from 'react-native';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      mensagem:""
    };
    this.mandar = this.mandar.bind(this);
  }

  mandar(){
    if (this.state.mensagem != ""){
      let url="http://192.168.1.107:5000/";

      let urlmensagem = url + "?msm=" + this.state.mensagem;

      fetch(urlmensagem, {method: 'POST',});
    }else{
      alert("Escreva a mensagem antes de mandar!")
    }
  }

  render() {
    return (
      <View style={styles.View}>
        <View style={{height:60, backgroundColor:"#1E90FF"}}>
          <Text style={styles.Text}>Helping Hand</Text>
        </View>
        <TextInput style={styles.TextInput} placeholder="Mensagem" underlineColorAndroid="transparent" onChangeText={(texto)=>{this.setState({mensagem:texto})}}/>
        <TouchableOpacity style={{height:45, marginHorizontal:40}} onPress={this.mandar} title="Enviar">
          <View style={styles.TOView}>
            <Text style={{alignSelf:"center"}}>Enviar</Text>
          </View>
        </TouchableOpacity>
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
    margin:10,
    fontSize:25,
    alignSelf:"center",
    color:'#fff'
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