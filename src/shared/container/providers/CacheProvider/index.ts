import { container } from 'tsyringe'

import ICacheProvider from './models/InterfaceCacheProvider'

import RedisCacheProvider from './implementations/RedisCacheProvider'

container.registerSingleton<ICacheProvider>('CacheProvider', RedisCacheProvider)
