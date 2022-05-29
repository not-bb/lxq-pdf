<template>
<input type="file" @change="fileChange" webkitdirectory ref="input" multiple/>
<button @click="Submit">开始</button>
<table>
  <thead>
    <tr>
      <th>海关编号</th>
      <th>提运单号</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in data" :key="item['海关编号']">
      <td>{{ item['海关编号'] }}</td>
      <td>{{ item['提运单号'] }}</td>
    </tr>
  </tbody>
</table>
</template>

<script>
import Pdfh5 from "pdfh5";

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      files: null,
      data: []
    }
  },
  methods: {
    fileChange (arg) {
      console.log(arg)
      this.files = arg.target.files;
    },
    async Submit(){
      this.files
      console.log(this.files);
      const table = [];
      for (const file of this.files) {
        table.push(await this.renderOne(file))
      }
      console.log(table);
      this.data = table;
    },
    renderOne(file){
      return new Promise(resolve => {
        var reader = new FileReader();
        reader.onloadend = function (evt) {
            if (evt.target.readyState == FileReader.DONE) {
                // callback(evt,evt.target.result);
                var pdfh5 = new Pdfh5('#demo', {
                  // pdfurl: "/1.pdf",
                  data: evt.target.result,
                  textLayer: true,
                });
                console.log(pdfh5)
                pdfh5.on("render", function () {
                  const getData = async () => {
                    try {
                      const fullSpans = [...document.querySelectorAll('.textLayer span')];
                      resolve({
                        海关编号: fullSpans.find(i => i.innerHTML && i.innerHTML.match(/海关编号：/)).innerHTML.replace(/海关编号：/, ''),
                        提运单号: fullSpans.find(i => i.innerHTML === '提运单号').nextSibling.innerHTML
                      });
                    } catch(e) {
                      await new Promise(r => setTimeout(r, 200));
                      return getData();
                    }
                  }
                  getData();
                })
            }
        };
        reader.readAsArrayBuffer(file)
      });
    }
  },

  created(){

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
