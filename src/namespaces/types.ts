export interface Item {
    id:                       number;
    title:                    string;
    brand_id:                 number;
    size_id:                  number;
    status_id:                number;
    user_id:                  number;
    country_id:               number;
    catalog_id:               number;
    color1_id:                number;
    color2_id:                number;
    package_size_id:          number;
    is_visible:               number;
    is_unisex:                number;
    is_closed:                number;
    moderation_status:        number;
    is_hidden:                boolean;
    favourite_count:          number;
    active_bid_count:         number;
    description:              string;
    package_size_standard:    boolean;
    item_closing_action:      null;
    related_catalog_ids:      any[];
    related_catalogs_enabled: boolean;
    size:                     string;
    brand:                    string;
    composition:              string;
    extra_conditions:         string;
    disposal_conditions:      number;
    is_for_sell:              boolean;
    is_handicraft:            boolean;
    is_processing:            boolean;
    is_draft:                 boolean;
    is_reserved:              boolean;
    label:                    string;
    original_price_numeric:   string;
    currency:                 string;
    price_numeric:            string;
    last_push_up_at:          Date;
    created_at_ts:            Date;
    updated_at_ts:            Date;
    user_updated_at_ts:       Date;
    msg_template_id:          null;
    is_delayed_publication:   boolean;
    item_alert_type:          null;
    photo_tip_id:             null;
    photos:                   PhotoElement[];
    push_up:                  PushUp;
    can_be_sold:              boolean;
    can_feedback:             boolean;
    item_reservation_id:      null;
    promoted_until:           null;
    promoted_internationally: null;
    discount_price_numeric:   null;
    author:                   null;
    book_title:               null;
    isbn:                     null;
    measurement_width:        null;
    measurement_length:       null;
    measurement_unit:         null;
    manufacturer:             null;
    manufacturer_labelling:   null;
    transaction_permitted:    boolean;
    video_game_rating_id:     null;
    item_attributes:          ItemAttribute[];
    "haov_item?":             boolean;
    user:                     VintedUser;
    price:                    OfflineVerificationFee;
    discount_price:           null;
    service_fee:              string;
    total_item_price:         string;
    total_item_price_rounded: null;
    can_edit:                 boolean;
    can_delete:               boolean;
    can_reserve:              boolean;
    can_mark_as_sold:         boolean;
    can_transfer:             boolean;
    instant_buy:              boolean;
    can_close:                boolean;
    can_buy:                  boolean;
    can_bundle:               boolean;
    can_ask_seller:           boolean;
    can_favourite:            boolean;
    user_login:               string;
    city_id:                  number;
    city:                     string;
    country:                  string;
    promoted:                 boolean;
    is_mobile:                boolean;
    bump_badge_visible:       boolean;
    brand_dto:                BrandDto;
    catalog_branch_title:     string;
    path:                     string;
    url:                      string;
    accepted_pay_in_methods:  any[];
    created_at:               string;
    color1:                   string;
    color2:                   string;
    size_title:               string;
    description_attributes:   DescriptionAttribute[];
    video_game_rating:        null;
    status:                   string;
    is_favourite:             boolean;
    view_count:               number;
    performance:              Performance;
    stats_visible:            boolean;
    can_push_up:              boolean;
    badge:                    null;
    size_guide_faq_entry_id:  number;
    localization:             string;
    offline_verification:     boolean;
    offline_verification_fee: OfflineVerificationFee;
    icon_badges:              IconBadge[];
}

export interface BrandDto {
    id:                          number;
    title:                       string;
    slug:                        string;
    favourite_count:             number;
    pretty_favourite_count:      string;
    item_count:                  number;
    pretty_item_count:           string;
    is_visible_in_listings:      boolean;
    requires_authenticity_check: boolean;
    is_luxury:                   boolean;
    is_hvf:                      boolean;
    path:                        string;
    url:                         string;
    is_favourite:                boolean;
}

export interface DescriptionAttribute {
    code:   string;
    title:  string;
    value:  string;
    faq_id: null;
}

export interface IconBadge {
    icon_big:   string;
    icon_small: string;
    label:      string;
}

export interface ItemAttribute {
    code: string;
    ids:  number[];
}

export interface OfflineVerificationFee {
    amount:        string;
    currency_code: string;
}

export interface Performance {
    item_id:                  number;
    impressions:              number;
    favorites:                number;
    views:                    number;
    impression_difference:    number;
    chart_data:               ChartDatum[];
    conversations:            number;
    next_push_up_time:        Date;
    last_push_up_at:          Date;
    promoted_until:           null;
    promotion_ends_in_days:   number;
    promotion_ended_days_ago: number;
    recently_promoted:        boolean;
    humanized_hours_left:     null;
}

export interface ChartDatum {
    date:        Date;
    impressions: number;
    highlighted: boolean;
}

export interface PhotoElement {
    id:                    number;
    image_no:              number;
    width:                 number;
    height:                number;
    dominant_color:        string;
    dominant_color_opaque: string;
    url:                   string;
    is_main:               boolean;
    thumbnails:            Thumbnail[];
    high_resolution:       HighResolution;
    is_suspicious:         boolean;
    full_size_url:         string;
    is_hidden:             boolean;
    extra:                 Extra;
}

export interface Extra {
}

export interface HighResolution {
    id:          string;
    timestamp:   number;
    orientation: null;
}

export interface Thumbnail {
    type:          string;
    url:           string;
    width:         number;
    height:        number;
    original_size: boolean | null;
}

export interface PushUp {
    next_push_up_time: Date;
}

export interface VintedUser {
    id:                                  number;
    anon_id:                             string;
    login:                               string;
    real_name:                           string;
    real_name_permission:                number;
    birthday_permission:                 number;
    email:                               string;
    birthday:                            null;
    gender:                              string;
    currency:                            string;
    item_count:                          number;
    given_item_count:                    number;
    taken_item_count:                    number;
    favourite_topic_count:               number;
    forum_msg_count:                     number;
    forum_topic_count:                   number;
    followers_count:                     number;
    following_count:                     number;
    following_brands_count:              number;
    positive_feedback_count:             number;
    neutral_feedback_count:              number;
    negative_feedback_count:             number;
    meeting_transaction_count:           number;
    account_status:                      number;
    email_bounces:                       null;
    feedback_reputation:                 number;
    feedback_count:                      number;
    account_ban_date:                    null;
    forum_ban_date:                      null;
    is_account_ban_permanent:            null;
    is_forum_ban_permanent:              null;
    is_on_holiday:                       boolean;
    is_publish_photos_agreed:            boolean;
    is_login_via_external_system_only:   boolean;
    allow_my_favourite_notifications:    boolean;
    allow_personalization:               boolean;
    show_recently_viewed_items:          boolean;
    undiscoverable:                      boolean;
    accepts_payments:                    boolean;
    is_location_public:                  boolean;
    expose_location:                     boolean;
    third_party_tracking:                boolean;
    default_address:                     DefaultAddress;
    created_at:                          Date;
    last_loged_on_ts:                    Date;
    city_id:                             number;
    city:                                string;
    country_id:                          number;
    country_code:                        string;
    country_iso_code:                    string;
    country_title:                       string;
    contacts_permission:                 null;
    contacts:                            null;
    photo:                               UserPhoto;
    path:                                string;
    is_god:                              boolean;
    is_tester:                           boolean;
    moderator:                           boolean;
    is_catalog_moderator:                boolean;
    is_catalog_role_marketing_photos:    boolean;
    hide_feedback:                       boolean;
    can_post_big_forum_photos:           boolean;
    allow_direct_messaging:              boolean;
    bundle_discount:                     BundleDiscount;
    fundraiser:                          null;
    business:                            boolean;
    business_account:                    null;
    has_confirmed_payments_account:      boolean;
    has_ship_fast_badge:                 boolean;
    total_items_count:                   number;
    about:                               string;
    verification:                        Verification;
    avg_response_time:                   null;
    carrier_ids:                         number[];
    carriers_without_custom_ids:         number[];
    international_trading_enabled:       null;
    locale:                              string;
    updated_on:                          number;
    is_hated:                            boolean;
    hates_you:                           boolean;
    is_favourite:                        boolean;
    profile_url:                         string;
    share_profile_url:                   string;
    facebook_user_id:                    null;
    is_online:                           boolean;
    can_view_profile:                    boolean;
    can_bundle:                          boolean;
    country_title_local:                 string;
    last_loged_on:                       string;
    has_item_alerts:                     boolean;
    has_replica_proof_items:             boolean;
    external_id:                         string;
    generated_login:                     boolean;
    infoboard_seen:                      boolean;
    soft_restricted_by_terms:            boolean;
    terms_update_available:              boolean;
    restricted_by_unconfirmed_real_name: boolean;
    restricted_by_balance_activation:    boolean;
    accepted_pay_in_methods:             AcceptedPayInMethod[];
    localization:                        string;
    is_bpf_price_prominence_applied:     boolean;
    msg_template_count:                  number;
}

export interface AcceptedPayInMethod {
    id:                     number;
    code:                   string;
    requires_credit_card:   boolean;
    event_tracking_code:    string;
    icon:                   string;
    enabled:                boolean;
    translated_name:        string;
    note:                   string;
    method_change_possible: boolean;
}

export interface BundleDiscount {
    id:                 number;
    user_id:            number;
    enabled:            boolean;
    minimal_item_count: number;
    fraction:           string;
    discounts:          Discount[];
}

export interface Discount {
    minimal_item_count: number;
    fraction:           string;
}

export interface DefaultAddress {
    id:           number;
    user_id:      number;
    country_id:   number;
    entry_type:   number;
    name:         string;
    postal_code:  string;
    city:         string;
    state:        string;
    line1:        string;
    line2:        null;
    phone_number: null;
}

export interface UserPhoto {
    id:                    number;
    width:                 number;
    height:                number;
    temp_uuid:             null;
    url:                   string;
    dominant_color:        string;
    dominant_color_opaque: string;
    thumbnails:            Thumbnail[];
    is_suspicious:         boolean;
    orientation:           null;
    high_resolution:       HighResolution;
    full_size_url:         string;
    is_hidden:             boolean;
    extra:                 Extra;
}

export interface Verification {
    email:    Email;
    facebook: Facebook;
    google:   Facebook;
    phone:    Facebook;
}

export interface Email {
    valid:     boolean;
    available: boolean;
}

export interface Facebook {
    valid:       boolean;
    verified_at: Date | null;
    available:   boolean;
}
