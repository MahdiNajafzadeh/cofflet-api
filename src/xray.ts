type XrayConfig = {
    log: LogObject,
    api: ApiObject,
    dns: DnsObject,
    fakedns: FakeDNSObject | FakeDNSObject[],
    inbounds: InboundObject[],
    outbounds: OutboundObject[],
    reverse: ReverseObject,
    routing: RoutingObject,
    policy: PolicyObject,
    stats: {},
    metrics: {},
    transport: {},
    observatory: {},
    burstObservatory: {}
}

type LogObject = {
    access: string,
    error: string,
    loglevel: "debug" | "info" | "warning" | "error" | "none",
    dnsLog: boolean
}

type ApiObject = {
    tag: string,
    listen: string,
    services: ("HandlerService" | "LoggerService" | "StatsService")[]
}


type ServerObject = {
    address: string,
    port: number,
    domains: string[],
    expectIPs: string[],
    skipFallback: boolean,
    clientIP: string
}

type DnsObject = {
    hosts: {
        [key: string]: string | string[]
    }
    servers: (string | ServerObject)[]
    queryStrategy: "UseIP" | "UseIPv4" | "UseIPv6"
    disableCache: boolean,
    disableFallback: boolean
    disableFallbackIfMatch: boolean
    tag: string
}

type FakeDNSObject = {
    ipPool: string,
    poolSize: number
}

type InboundSettingsObject = {}

type StreamSettingsObject = {
    network: "tcp" | "kcp" | "ws" | "http" | "quic" | "grpc" | "httpupgrade" | "splithttp",
    security: "none" | "tls" | "reality"
    tlsSettings: {},
    tcpSettings: {},
    kcpSettings: {},
    wsSettings: {},
    httpSettings: {},
    quicSettings: {},
    dsSettings: {},
    grpcSettings: {},
    httpupgradeSettings: {},
    splithttpSettings: {},
    sockopt: {
        mark: 0,
        tcpMaxSeg: 1440,
        tcpFastOpen: false,
        tproxy: "off",
        domainStrategy: "AsIs",
        dialerProxy: "",
        acceptProxyProtocol: false,
        tcpKeepAliveInterval: 0,
        tcpKeepAliveIdle: 300,
        tcpUserTimeout: 10000,
        tcpCongestion: "bbr",
        interface: "wg0",
        v6only: false,
        tcpWindowClamp: 600,
        tcpMptcp: false,
        tcpNoDelay: false
    }
}

type SniffingObject = {
    enabled: true,
    destOverride: ("http" | "tls" | "quic" | "fakedns" | "fakedns+others")[],
    metadataOnly: boolean,
    domainsExcluded: string[],
    routeOnly: boolean
}

type AllocateObject = {
    strategy: "always" | "random",
    refresh: number,
    concurrency: number
}

type InboundObject = {
    listen: string,
    port: number | `env:${string}` | string,
    protocol: string
    settings: InboundSettingsObject,
    streamSettings: StreamSettingsObject,
    tag: string
    sniffing: SniffingObject
    allocate: AllocateObject,
}

type OutboundSettingsObject = {}

type OutboundObject = {
    sendThrough: string,
    protocol: string,
    settings: OutboundSettingsObject,
    tag: string,
    streamSettings: StreamSettingsObject,
    proxySettings: { tag: string },
    mux: {
        enabled: boolean,
        concurrency: number
    }
}

type LevelPolicyObject = {
    [key: string]: {
        handshake: number,
        connIdle: number,
        uplinkOnly: number,
        downlinkOnly: number,
        statsUserUplink: boolean,
        statsUserDownlink: boolean,
        bufferSize: number
    }
}

type PolicyObject = {
    levels: LevelPolicyObject,
    system: {
        statsInboundUplink: boolean,
        statsInboundDownlink: boolean,
        statsOutboundUplink: boolean,
        statsOutboundDownlink: boolean
    }
}

type BridgeObject = {
    tag: string,
    domain: string
}

type PortalObject = {
    tag: string
    domain: string
}

type ReverseObject = {
    bridges: BridgeObject[],
    portals: PortalObject[]
}

type RuleObject = {
    domainMatcher: "hybrid",
    type: "field",
    domain: string[],
    ip: string[],
    port: number | string
    sourcePort: number | string
    network: "tcp" | "udp" | "tcp,udp"
    source: string[],
    user: string[],
    inboundTag: string[],
    protocol: ("http" | "tls" | "bittorrent")[]
    attrs: { [key: string]: string },
    outboundTag: string
    balancerTag: string
}

type BalancerObject = {
    tag: string,
    selector: string[]
}

type RoutingObject = {
    domainStrategy: "AsIs" | "IPIfNonMatch" | "IPOnDemand",
    domainMatcher: "hybrid" | "linear"
    rules: RuleObject[],
    balancers: []
}