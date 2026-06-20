export interface Project {
  id: number;
  title: string;
  category: "Networking" | "System Administration" | "Cloud" | "Cyber Security";
  description: string;
  tech: string[];
  details: string[];
  topologyCode?: string; // Representation code for network drawer
  commands?: string[]; // Terminal command hints related to this project
}

export interface Certification {
  provider: "Aguna Course" | "Cisco Certified";
  title: string;
  badgeColor: string;
  skillsCovered: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  points: string[];
}

export const portfolioData = {
  profile: {
    name: "Andika Marvelino Putra",
    role: "IT Enthusiast",
    subtitle: "SMK Wikrama Bogor Student | Specializing in Linux Systems, Networking, and Cybersecurity",
    email: "andikamarvelinop@gmail.com",
    phone: "0857-7462-1064",
    address: "Jl. Lawanggintung, KP. Sawah, Bogor Kota, Indonesia",
    linkedin: "linkedin.com/in/andika-marvelino-putra-79b988347",
    githubPlaceholder: "github.com/andikamarvelino",
    aboutText: "Seorang siswa SMK jurusan Teknik Jaringan Komputer dan Telekomunikasi di SMK Wikrama Bogor (2024-2027) yang memiliki minat tinggi di bidang System Administration, Infrastruktur Server, dan Keamanan Jaringan. Memiliki kemampuan dasar dalam penggunaan Linux, administrasi server, virtualisasi, monitoring sistem, serta troubleshooting perangkat dan jaringan. Saya berkomitmen untuk terus belajar, berkembang, dan memberikan kontribusi terbaik di dunia teknologi.",
  },
  experiences: [
    {
      role: "Praktik CBT (Competence Based Training)",
      company: "SMK Wikrama Bogor",
      period: "15 - 19 Desember 2025",
      points: [
        "Melakukan perbaikan kabel jaringan UTP dengan melakukan crimping ulang dan pengecekan koneksi menggunakan LAN Tester.",
        "Melakukan perapihan jalur/rute kabel jaringan agar lebih tertata, aman, dan mudah dilakukan maintenance di masa depan.",
        "Melakukan monitoring jaringan menggunakan Winbox dan OPNsense untuk membantu pengecekan kondisi router dan firewall sekolah.",
        "Membantu teknisi dalam melakukan instalasi windows 10 secara massal pada laptop inventaris sekolah.",
        "Membantu penanganan perangkat multimedia seperti pengecekan, monitoring, dan perbaikan speaker laboratorium.",
        "Melakukan pencabutan kabel yang tidak digunakan serta membantu penataan perangkat server agar lebih rapih."
      ]
    }
  ] as Experience[],
  education: {
    school: "SMK Wikrama Bogor",
    period: "2024 - 2027",
    major: "Technical Network Computer and Telecommunication",
    details: "Mempelajari dasar administrasi sistem, jaringan Cisco/MikroTik, keamanan cyber, perancangan infrastruktur cloud, dan virtualisasi Linux."
  },
  certifications: [
    {
      provider: "Aguna Course",
      title: "Virtual Machine Fundamental",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      skillsCovered: ["Hypervisor concepts", "Proxmox/VirtualBox usage", "VM resource allocation", "Virtual Networking"]
    },
    {
      provider: "Aguna Course",
      title: "Network Fundamental",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      skillsCovered: ["OSI Model", "Subnetting (VLSM)", "TCP/IP Suite", "Basic Network Hardware"]
    },
    {
      provider: "Aguna Course",
      title: "Linux Fundamental",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      skillsCovered: ["SSH Configurations", "Bash Scripting", "File System Hierarchy", "User Permissions"]
    },
    {
      provider: "Cisco Certified",
      title: "Introduction to Cybersecurity",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      skillsCovered: ["Cyber Threat Landscape", "Data Protection", "Basic Cryptography", "Security Principles"]
    },
    {
      provider: "Cisco Certified",
      title: "Cybersecurity Essentials",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      skillsCovered: ["Vulnerability Assessment", "Firewall Configurations", "IDS/IPS Systems", "Incident Response"]
    }
  ] as Certification[],
  projects: [
    {
      id: 1,
      title: "Perancangan Topologi dan Routing Jaringan",
      category: "Networking",
      description: "Membuat desain topologi jaringan inter-VLAN dan mengonfigurasi perutean dinamis menggunakan Cisco Packet Tracer.",
      tech: ["Cisco Packet Tracer", "Dynamic Routing (RIP/OSPF)", "Trunking VLSM", "Inter-VLAN Routing"],
      details: [
        "Mendesain jaringan dengan 3 subnet berbeda menggunakan standar VLSM untuk utilitas IP yang efisien.",
        "Mengonfigurasi switch layer-2 agar mendukung inter-VLAN routing menggunakan teknik Router-on-a-Stick.",
        "Menyertakan tabel routing statis dan opsi OSPF dinamis untuk menjaga redundansi link utama apabila terjadi kegagalan gateway."
      ],
      commands: ["ping 192.168.1.1", "show ip route", "traceroute"]
    },
    {
      id: 2,
      title: "Membangun Server Superlab",
      category: "System Administration",
      description: "Instalasi dan konfigurasi server Linux mandiri dengan layanan web host, file server, DNS internal, dan database relasional.",
      tech: ["Linux Ubuntu/Debian", "Bind9 DNS", "Apache2 Web Server", "ISC-DHCP-Server", "PHP / phpMyAdmin / WordPress"],
      details: [
        "Membangun infrastruktur layanan lokal mandiri (localhost/superlab) lengkap dengan kustom domain lokal.",
        "Mengonfigurasi DHCP server untuk membagikan alamat IP secara dinamis dengan sewa waktu terkelola.",
        "Menghubungkan basis data MySQL dengan instansi WordPress ter-deploy langsung pada system Linux Server."
      ],
      commands: ["systemctl status bind9", "sudo ufw status", "nslookup superlab.internal"]
    },
    {
      id: 3,
      title: "Konfigurasi MikroTik & Wireless Access Point",
      category: "Networking",
      description: "Konfigurasi komprehensif MikroTik Routerboard untuk gateway kantor/sekolah beserta managemen bandwidth dan hak akses nirkabel.",
      tech: ["MikroTik RouterOS", "Winbox", "NAT Masquerade", "DHCP Server Pools", "Queue Simple Bandwidth Limit"],
      details: [
        "Mengatur routing internet gateway, konfigurasi IP Static WAN, dan DHCP dynamic interfaces untuk Local Area Network (LAN).",
        "Membatasi bandwidth per user menggunakan Queue Simple untuk menjamin keadilan distibusi internet.",
        "Melakukan setup Wireless Access Point dengan otentikasi WPA2-Enterprise untuk menjamin koneksi nirkabel tetap aman."
      ],
      commands: ["/ip dhcp-server print", "/queue simple monitor 1", "ping gateway.router"]
    },
    {
      id: 4,
      title: "Deployment Web Server Menggunakan AWS",
      category: "Cloud",
      description: "Migrasi dan manajemen layanan web internal sekolah ke infrastruktur Cloud Amazon Web Services (AWS) global.",
      tech: ["AWS EC2", "AWS RDS (MySQL)", "Amazon Route 53", "Nginx", "WordPress Core & CRUD Systems"],
      details: [
        "Melakukan setup virtual instance Ubuntu LTS pada AWS EC2 lengkap dengan Security Groups firewall cloud.",
        "Mengonfigurasi database MySQL handal terpisah menggunakan AWS RDS (Relational Database Service).",
        "Mengintegrasikan Domain Name Server dengan Route 53 untuk pointing domain andikamarvelino.tech ke server AWS EC2."
      ],
      commands: ["ssh -i key.pem ubuntu@aws-ec2", "curl -I https://andikamarvelino.tech", "df -h"]
    },
    {
      id: 5,
      title: "Basic Cyber Security & Network Monitoring",
      category: "Cyber Security",
      description: "Audit keamanan jaringan lokal, monitoring lalu-lintas paket, dan penangkalan serangan brute-force / DDoS menggunakan firewall tangguh.",
      tech: ["Nmap Scanner", "OPNsense Firewall", "Zenarmor NextGen", "Ettercap Packet Capture", "Ubuntu Linux Hardening"],
      details: [
        "Melakukan pemindaian open-ports dan melacak sistem operasi yang aktif dalam jaringan menggunakan Nmap utility.",
        "Menerapkan Next-Generation Firewall menggunakan kontrol plugin Zenarmor pada distro OPNsense.",
        "Mensimulasikan serangan Man-in-the-Middle (MitM) dengan Ettercap untuk memverifikasi proteksi ARP Poisoning pada switch jaringan."
      ],
      commands: ["nmap -sV 192.168.1.0/24", "sudo zenarmor-cli status", "ettercap -T -q"]
    }
  ] as Project[],
  skills: [
    { name: "Linux System Administration", level: 90, icon: "Terminal", category: "System" },
    { name: "Cisco Routing & Switching", level: 85, icon: "Network", category: "Network" },
    { name: "MikroTik RouterOS / Winbox", level: 85, icon: "Cpu", category: "Network" },
    { name: "Cybersecurity & Firewall (OPNsense)", level: 80, icon: "ShieldAlert", category: "Security" },
    { name: "Network Monitoring (Zenarmor, Nmap)", level: 85, icon: "Activity", category: "Security" },
    { name: "Virtualization (VirtualBox / Proxmox)", level: 75, icon: "Layers", category: "System" },
    { name: "Amazon Web Services (AWS) Deployment", level: 70, icon: "Cloud", category: "Cloud" },
    { name: "Web Server & Database (LAMP/LEMP)", level: 80, icon: "Server", category: "System" },
  ]
};
