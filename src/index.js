import 'bootstrap/dist/css/bootstrap.css'
import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'
import jQuery from 'jquery'
require('babel-polyfill')

import {MnistData} from './mnist_data'
import * as util from './mnist_utils'
import {initCanvas} from './draw_utils'