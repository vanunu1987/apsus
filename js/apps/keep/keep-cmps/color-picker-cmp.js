export default {
    props: ['data', 'idx'],
    template: `

            <section class="color-continer flex column">
                    <section class="flex">
                    <button @click.stop.prevent="returnColor('#fdcfe8')" class="colors" :style="{backgroundColor: '#fdcfe8'}"></button>
                    <button @click.stop.prevent="returnColor('#e0a9ff')" class="colors" :style="{backgroundColor: '#e0a9ff'}"></button>
                    <button @click.stop.prevent="returnColor('#e6c9a8')" class="colors" :style="{backgroundColor: '#e6c9a8'}"></button>
                    <button @click.stop.prevent="returnColor('#e8eaed')" class="colors" :style="{backgroundColor: '#e8eaed'}"></button>
                    </section>
                    <section class="flex">
                    <button @click.stop.prevent="returnColor('#a7ffeb')" class="colors" :style="{backgroundColor: '#a7ffeb'}"></button>
                    <button @click.stop.prevent="returnColor('#fff475')" class="colors" :style="{backgroundColor: '#fff475'}"></button>
                    <button @click.stop.prevent="returnColor('#f28b82')" class="colors" :style="{backgroundColor: '#f28b82'}"></button>
                    <button @click.stop.preventk="returnColor('#f28b82')" class="colors" :style="{backgroundColor: '#f28b82'}"></button>
                    </section>
            </section>

        `,
        methods:{
            returnColor(color){
                this.$emit('returnColor',color)
            }
        }
}
