<template>
  <main class="main">
    <Header />

    <section class="section search">
      <form class="wrap" @submit.prevent="sendData()">
        <div class="search-block">
            <div class="search-header">
                <h4>Histone modifications</h4>
                <div class="info">
                    <div class="info__window">
                        <p>Choose from one to ten histone modifications</p>
                    </div>
                </div>
            </div>
            <div class="search-wrap">
                <div class="checkbox">
                    <input type="checkbox" id="histone1" v-model="histones.H3K27ac"/>
                    <label for="histone1">H3K27ac</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="histone2" v-model="histones.H3K27me3"/>
                    <label for="histone2">H3K27me3</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="histone3" v-model="histones.H3K36me3"/>
                    <label for="histone3">H3K36me3</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="histone4" v-model="histones.H3K4me1"/>
                    <label for="histone4">H3K4me1</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="histone5" v-model="histones.H3K4me2"/>
                    <label for="histone5">H3K4me2</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="histone6" v-model="histones.H3K4me3"/>
                    <label for="histone6">H3K4me3</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="histone7" v-model="histones.H3K9ac"/>
                    <label for="histone7">H3K9ac</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="histone8" v-model="histones.H3K9me3"/>
                    <label for="histone8">H3K9me3</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="histone9" v-model="histones.H3K79me2"/>
                    <label for="histone9">H3K79me2</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="histone10" v-model="histones.H4K20me1"/>
                    <label for="histone10">H4K20me1</label>
                </div>
            </div>
        </div>
        <div class="search-block search-block_middle">
            <div class="search-header">
                <h4>lncRNA/lncRNA ID</h4>
                <div class="info">
                    <div class="info__window">
                        <p>Filter by lncRNAs that affect histone modifications selected above.</p>
                        <p>Add Ensembl IDs or names of lncRNA one by one with Enter, or load file with lncRNAs in a column.</p>
                    </div>
                </div>
            </div>
            <div class="search-wrap">
                <div class="search-string">
                    <!-- <div class="input-search">
                        <input type="text" id="lncRNA">
                    </div> -->
                    <div class="input-add">
                        <input type="text" id="lncRNA" placeholder="Add one by one via 'Enter'" @keydown.enter.prevent="setElement('lncrna')" v-model="lncrnaInput">
                    </div>
                    <upload-button
                        title="Load file"
                        block
                        name="gene"
                        class="button violet"
                        id="gene"
                        @file-update="updateFile"
                    />
                    <div class="info black">
                        <div class="info__window">
                            <p>File should be in txt format, and max 2mb size.</p>
                        </div>
                    </div>
                    <div class="clear" @click="lncrna = []" v-show="lncrna.length > 0">
                        <p>Clear</p>
                    </div>
                </div>
                <div class="search-output" v-if="lncrna.length > 0">
                    <div class="search-output__item" @click="lncrna.splice(index, 1)" v-for="(rna, index) in lncrna" :key="index" :rna="rna">{{ rna }}</div>
                </div>
                <div class="button button_show" v-if="lncrna.length > 2" @click="showAll('lncrna')">
                    <p>Show all {{ lncrna.lenght }}</p>
                </div>
            </div>
        </div>
        <div class="search-block search-block_middle">
            <div class="search-header">
                <h4>Gene/Gene ID</h4>
                <div class="info">
                    <div class="info__window">
                        <p>Filter by genes that have (in the body or + 1000bp) the modifications selected above.</p>
                        <p>Add gene ids or names one by one with Enter, or load file with genes in a column.</p>
                    </div>
                </div>
            </div>
            <div class="search-wrap">
                <div class="search-string">
                    <div class="input-add">
                        <input type="text" id="Gene" placeholder="Add one by one via 'Enter'" @keydown.enter.prevent="setElement('genes')" v-model="genesInput">
                    </div>
                    <upload-button
                        title="Load file"
                        block
                        name="gene"
                        class="button violet"
                        id="gene"
                        @file-update="genesFile"
                    />
                    <div class="info black">
                        <div class="info__window">
                            <p>File should be in txt format, and max 2mb size.</p>
                        </div>
                    </div>
                    <div class="clear" @click="genes = []" v-show="genes.length > 0">
                        <p>Clear</p>
                    </div>
                </div>
                <div class="search-output" v-if="genes.length > 0">
                    <div class="search-output__item" @click="genes.splice(index, 1)" v-for="(rna, index) in genes" :key="index" :rna="rna">{{ rna }}</div>
                </div>
                <div class="button button_show" v-if="genes.length > 2" @click="showAll('genes')">
                    <p>Show all {{ genes.lenght }}</p>
                </div>
            </div>
        </div>
        <div class="search-block search-block_middle">
            <div class="search-header">
                <h4>Genomic Coordinates</h4>
                <div class="info">
                    <div class="info__window">
                        <p>Filter by genome loci.</p>
                        <p>Add tab separated gene loci coords in bed format, each on a new line, or load bed file.</p>
                    </div>
                </div>
            </div>
            <div class="search-wrap">
                <div class="search-string">
                    <textarea ref="ta" class="textarea" id="coords" cols="30" rows="8" placeholder="Add one by one via tab, example: 
chrX    73944182    74070408" v-model="coordsInput" @keyup="changeCoords" @keydown.tab.prevent="setTab()"></textarea>
                </div>
                <div class="search-string">
                    <div class="button" v-if="coords.length > 2" @click="showAll('coords')">
                        <p>Show all {{ coords.lenght }}</p>
                    </div>
                    <upload-button
                        title="Load file"
                        block
                        ripped
                        name="coords"
                        class="button violet"
                        id="coords"
                        @file-update="coordsFile"
                    />
                    <div class="info black">
                        <div class="info__window">
                            <p>File should be in txt format, and max 2mb size.</p>
                        </div>
                    </div>
                    <div class="clear" @click="coords = []" v-show="coords.length > 0">
                        <p>Clear</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="search-block search-block_middle">
            <div class="search-header">
                <h4>Correlation threshold</h4>
                <div class="info">
                    <div class="info__window">
                        <p>Filter by strength of interaction between histone modifications signal and lncRNA expression.</p>
                        <p>Choose sign and thresholds of ChIP-Seq signal - lncRNA expression correlations.</p>
                    </div>
                </div>
            </div>
            <div class="search-wrap">
                <div class="search-string">
                    <div class="checkbox">
                        <input type="checkbox" id="plus" v-model="plus"/>
                        <label for="plus">+</label>
                    </div>
                    <div class="checkbox">
                        <input type="checkbox" id="minus" v-model="minus"/>
                        <label for="minus">—</label>
                    </div>
                </div>
                <div class="search-string">
                    <Slider v-show="plus" name="plus"/>
                </div>
                <div class="search-string">
                    <Slider v-show="minus" name="minus"/>
                </div>
            </div>
        </div>
        <div class="search-button">
            <input class="button" type="submit" value="Search" />
        </div>
      </form>
    </section>
    <section class="modal" v-if="modal.open">
        <div class="modal-close" @click="modal.open = false">
            <img src="@/assets/images/icon_close.svg" alt="">
        </div>
        <div class="wrap">
            <div class="modal-body">
                <h2 class="modal-title">All choisen {{ modal.title }}</h2>
                <div class="modal-list" v-if="modal.data && modal.title === 'lncrna'">
                    <div class="search-output__item" @click="lncrna.splice(index, 1)" v-for="(rna, index) in modal.data" :key="index" :rna="rna">{{ rna }}</div>
                </div>
                <div class="modal-list" v-if="modal.data && modal.title === 'genes'">
                    <div class="search-output__item" @click="genes.splice(index, 1)" v-for="(rna, index) in modal.data" :key="index" :rna="rna">{{ rna }}</div>
                </div>
                <div class="modal-list" v-if="modal.data && modal.title === 'coords'">
                    <div class="search-output__item" @click="coords.splice(index, 1)" v-for="(rna, index) in modal.data" :key="index" :rna="rna">{{ rna }}</div>
                </div>
            </div>
        </div>
    </section>
    <Loader />
    <Notification v-if="warning.open" :title="warning.title"/>
    <Footer />
  </main>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Slider from '@/components/ui/Slider';
import Loader from '@/components/Loader';
import Notification from '@/components/Notification';
import UploadButton from 'vuetify-upload-button'

export default {
  name: 'dashboard',
  components: {
    Header,
    Footer,
    Slider,
    Loader,
    Notification,
    UploadButton
  },
  data() {
    return {
        modal: {
            open: false,
            data: null
        },
        warning: {
            open: false,
            title: 'Choose modification'
        },
        lncrna: [],
        genes: [],
        coords: [],
        mrange: [],
        prange: [],
        lncrnaInput: null,
        genesInput: null,
        coordsInput: null,
        plus: false,
        minus: false,
        histones: {
            H3K27ac: false,
            H3K27me3: false,
            H3K36me3: false,
            H3K4me1: false,
            H3K4me2: false,
            H3K4me3: false,
            H3K9ac: false,
            H3K9me3: false,
            H3K79me2: false,
            H4K20me1: false
        }
        }
  },
  methods: {
    async changeCoords () {
        this.coords = []
        let strings = this.coordsInput.split('\n')
        await strings.forEach(element => {
            this.coords.push(element.split('\t'))
        })
    },
    setTab () {
        let textarea = this.$refs.ta
        let cursorPosition = textarea.selectionStart;
        let str = this.coordsInput;
        let newStr = '';
        for (const key in str) {
            key == cursorPosition - 1 ? newStr = newStr + str[key] + '\t' : newStr = newStr + str[key];
        }
        this.coordsInput = newStr;
    },
    showAll (name) {
        this.modal.open = true
        this.modal.data = this[name]
        this.modal.title = name;
    },
    genesFile(file) {
        const reader = new FileReader()
        reader.onload = e => {
            let dataArray = e.target.result.split('\n')
            dataArray.forEach(element => {
                this.genes.push(element)
            });
        }

        reader.readAsText(file)
    },
    updateFile(file) {
        const reader = new FileReader()
        reader.onload = e => {
            let dataArray = e.target.result.split('\n')
            dataArray.forEach(element => {
                this.lncrna.push(element)
            });
        }

        reader.readAsText(file)
    },
    coordsFile(file) {
        const reader = new FileReader()
        reader.onload = e => {
            let strings = e.target.result.split('\n');
            this.coords = []
            strings.forEach(element => {
                this.coords.push(element.split('\t'))
            })
            this.showWarning('Coords was uploaded!')
            this.coordsInput = e.target.result
        }

        reader.readAsText(file)
    },
    setElement (name) {
        if (name === 'coords') {
            let strings = this[name + 'Input'].split('\n');
            strings.forEach(element => {
                this[name].push(element.split('\t'))
            })
        } else {
            this[name].push(this[name + 'Input'])
        }
        this[name + 'Input'] = null
    },
    async sendData () {
        let histones = [];
        let modifChousen = false;
        for (const key in this.histones) {
            const element = this.histones[key];
            element ? (
                histones.push(key),
                modifChousen = true
            ) : '';
        }
        if (modifChousen && (this.plus || this.minus || this.coords.length > 0 || this.lncrna.length > 0 || this.genes.length > 0)) {

            let searchData = {
                hm: histones,
                lncrna: this.lncrna,
                genes: this.genes,
                coords: this.coords,
                thresholds_choisen: [this.plus, this.minus]
            };
            this.$store.dispatch('setLoader', true)
            await this.$store.dispatch('setSearch', searchData)
            let result = await this.$store.dispatch('search', [searchData, 1, 10])
            this.$store.dispatch('setLoader', false)
            result ? this.$router.push('/result') : this.showWarning('Something went wrong');
        } else if (!modifChousen) {
            alert("Please choose histone modifications")

        } else if (modifChousen && (!this.plus || !this.minus || this.coords.length == 0 || this.lncrna.length == 0 || this.genes.length == 0)) {
            //this.showWarning('Сhoose some filters')
            alert('Сhoose some filters')
        } else  {
            //this.showWarning('Сhoose some modifications and filters')
            alert('Сhoose some modifications and filters')
        }
    },
    showWarning(title) {
        title ? this.warning.title = title : '';
        this.warning.open = !this.warning.open
        setTimeout(() => {this.warning.open = !this.warning.open}, 4000)
    }
  },
  computed: {
    getRanges () {
      return this.$store.getters.getRanges
    }
  }
}

</script>
