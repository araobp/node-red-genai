# Sample Flows

### Testing query with RAG

<img src="./template_rag.jpg" width=700>

<img src="./rag_test.jpg" width=700>

<img src="./template_dialog.jpg" width=700>

```
<template>
    <div class="frame">
        <h3>Result</h3>
        <br>
        <span v-html="markdown"></span>
    </div>
</template>

<script>
    export default {
        data() {
            // define variables available component-wide
            // (in <template> and component functions)
            return {
                markdown: ""
            }
        },
        watch: {
            msg: function () {
                this.markdown = this.msg.payload
            }       
        },
        computed: {
            // automatically compute this variable
            // whenever VueJS deems appropriate
        },
        methods: {
            // expose a method to our <template> and Vue Application
        },
        mounted() {
            // code here when the component is first loaded
        },
        unmounted() {
            // code here when the component is removed from the Dashboard
            // i.e. when the user navigates away from the page
        }
    }
</script>
<style>
    .frame {
        margin-left: 15px;
        margin-right: 15px;
    }
    h1 {
        margin-bottom: 1rem;
    }
    h2, h3, h4, h5 {
        margin-top: 0.1rem;
        margin-bottom: 0.3rem;
    }
    ul li {
        margin-left: 1rem;
    }
    ul {
        margin-bottom: 0.2rem;
    }
    ol li {
        margin-left: 1rem;
    }
    ol {
        margin-bottom: 0.2rem;
    }
    p {
        margin-bottom: 0.2rem;
    }
</style>
```

<img src="./dashboard_test.jpg" width=700>

### Testing the camera

<img src="./chat_dialog.jpg" width=700>

<img src="./template_camera.jpg" width=700>

<img src="./camera_test.jpg" width=700>

### Testing IoT flows

MQTT publisher (This script simulates a proximity sensor emitting an proximity event to the MQTT broker)

```
abc@raspberrypi:~/node-red-ai-agents/bin $ ./image_recognition_start.sh
```

MQTT subscriber (This script simulates a output device such as LCD)

```
abc@raspberrypi:~/node-red-ai-agents/bin $ ./image_recognition_result.sh 
{"keyphrases": ["indoor setting", "ceiling", "curtains", "windows", "wall clock", "square opening", "furniture", "lighting", "daytime", "ambient light"]}
```
